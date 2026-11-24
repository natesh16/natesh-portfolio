'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaHeart,
  FaPaperPlane,
  FaRegComment,
  FaRegHeart,
  FaReply,
  FaTrashAlt,
} from 'react-icons/fa';

const MAX = 600;
const AUTHOR_KEY = 'natesh-comment-author';
const NAME_KEY = 'natesh-comment-name';

const keyFor = (slug) => `natesh-blog-comments:${slug}`;

const uid = () =>
  globalThis.crypto?.randomUUID?.() ||
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

function read(slug) {
  try {
    const raw = localStorage.getItem(keyFor(slug));
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((c) => c && c.id && typeof c.body === 'string') : [];
  } catch {
    return [];
  }
}

function ago(iso, now) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return 'just now';
  const mins = Math.max(0, Math.floor((now - then) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function fullDate(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}

function initials(name) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || '?'
  );
}

// Deterministic, slightly tinted charcoal avatar for each name.
function tint(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % 360;
  return `linear-gradient(145deg,hsl(${hash} 9% 34%),hsl(${(hash + 42) % 360} 7% 19%))`;
}

export default function Comments({ slug }) {
  const [comments, setComments] = useState(null);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [sort, setSort] = useState('new');
  const [confirmId, setConfirmId] = useState(null);
  const [authorId, setAuthorId] = useState('');
  const [now, setNow] = useState(() => Date.now());
  const textRef = useRef(null);

  useEffect(() => {
    setComments(read(slug));
    setReplyTo(null);
    setError('');
    setConfirmId(null);
    setNow(Date.now());

    try {
      let id = localStorage.getItem(AUTHOR_KEY);
      if (!id) {
        id = uid();
        localStorage.setItem(AUTHOR_KEY, id);
      }
      setAuthorId(id);
      setName(localStorage.getItem(NAME_KEY) || '');
    } catch {
      setAuthorId(uid());
    }
  }, [slug]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === keyFor(slug)) setComments(read(slug));
    };
    addEventListener('storage', onStorage);
    return () => removeEventListener('storage', onStorage);
  }, [slug]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const save = (next) => {
    setComments(next);
    try {
      localStorage.setItem(keyFor(slug), JSON.stringify(next));
    } catch {
      /* Private mode: keep the comments for this session only. */
    }
  };

  const roots = useMemo(() => {
    const list = comments || [];
    const ids = new Set(list.map((c) => c.id));
    return list
      .filter((c) => !c.parentId || !ids.has(c.parentId))
      .sort((a, b) => {
        const diff = String(a.createdAt).localeCompare(String(b.createdAt));
        return sort === 'new' ? -diff : diff;
      });
  }, [comments, sort]);

  const repliesFor = (id) =>
    (comments || [])
      .filter((c) => c.parentId === id)
      .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));

  const count = comments?.length ?? 0;

  const focusForm = (id) => {
    setReplyTo(id ? { id, name: comments.find((c) => c.id === id)?.name || 'commenter' } : null);
    setError('');
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => {
      textRef.current?.focus({ preventScroll: true });
      textRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
    }, 20);
  };

  const submit = (e) => {
    e.preventDefault();
    const nextName = name.trim().replace(/\s+/g, ' ').slice(0, 40);
    const nextBody = body.trim().slice(0, MAX);

    if (nextName.length < 2) {
      setError('Please add your name (at least 2 characters).');
      return;
    }
    if (nextBody.length < 3) {
      setError('Write at least a few words before posting.');
      return;
    }

    const parentOk = replyTo && comments?.some((c) => c.id === replyTo.id);
    let id = authorId;
    if (!id) {
      id = uid();
      setAuthorId(id);
      try {
        localStorage.setItem(AUTHOR_KEY, id);
      } catch {
        /* ignore */
      }
    }

    const comment = {
      id: uid(),
      authorId: id,
      parentId: parentOk ? replyTo.id : null,
      name: nextName,
      body: nextBody,
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
    };

    save([...(comments || []), comment]);
    try {
      localStorage.setItem(NAME_KEY, nextName);
    } catch {
      /* ignore */
    }
    setName(nextName);
    setBody('');
    setReplyTo(null);
    setError('');
    setSort('new');
    setConfirmId(null);
  };

  const toggleLike = (id) => {
    save(
      (comments || []).map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: Math.max(0, (Number(c.likes) || 0) + (c.liked ? -1 : 1)),
            }
          : c
      )
    );
  };

  const remove = (id) => {
    save((comments || []).filter((c) => c.id !== id && c.parentId !== id));
    if (replyTo?.id === id) setReplyTo(null);
    setConfirmId(null);
  };

  const actionButtons = (c, isReply) => (
    <div className="comment-actions">
      <button
        type="button"
        className={`comment-act${c.liked ? ' is-liked' : ''}`}
        onClick={() => toggleLike(c.id)}
        aria-pressed={!!c.liked}
        aria-label={c.liked ? `Unlike ${c.name}'s comment` : `Like ${c.name}'s comment`}
      >
        {c.liked ? <FaHeart aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
        <span>{(c.likes || 0) > 0 ? c.likes : 'Like'}</span>
      </button>

      {!isReply ? (
        <button type="button" className="comment-act" onClick={() => focusForm(c.id)}>
          <FaReply aria-hidden="true" />
          <span>Reply</span>
        </button>
      ) : null}

      {c.authorId && c.authorId === authorId ? (
        confirmId === c.id ? (
          <span className="comment-confirm">
            Delete?
            <button type="button" onClick={() => remove(c.id)}>Yes</button>
            <button type="button" onClick={() => setConfirmId(null)}>No</button>
          </span>
        ) : (
          <button
            type="button"
            className="comment-act comment-act--danger"
            onClick={() => setConfirmId(c.id)}
            aria-label="Delete your comment"
          >
            <FaTrashAlt aria-hidden="true" />
            <span>Delete</span>
          </button>
        )
      ) : null}
    </div>
  );

  const renderComment = (c, isReply = false) => (
    <div className="comment-main">
      <span className="comment-avatar" style={{ background: tint(c.name) }} aria-hidden="true">
        {initials(c.name)}
      </span>
      <div className="comment-content">
        <div className="comment-meta">
          <b>{c.name}</b>
          {c.authorId && c.authorId === authorId ? <span className="comment-you">You</span> : null}
          <time dateTime={c.createdAt} title={fullDate(c.createdAt)}>
            {ago(c.createdAt, now)}
          </time>
        </div>
        <p className="comment-text">{c.body}</p>
        {actionButtons(c, isReply)}
      </div>
    </div>
  );

  return (
    <section className="comments" aria-labelledby="comments-title">
      <div className="comments-head">
        <div>
          <span className="kicker">Discussion</span>
          <h2 id="comments-title">
            Comments
            <span className="comments-count" aria-label={`${count} comments`}>
              {count}
            </span>
          </h2>
        </div>
        {count > 1 ? (
          <div className="comments-sort" role="group" aria-label="Sort comments">
            <button
              type="button"
              className={sort === 'new' ? 'is-on' : undefined}
              aria-pressed={sort === 'new'}
              onClick={() => setSort('new')}
            >
              Newest
            </button>
            <button
              type="button"
              className={sort === 'old' ? 'is-on' : undefined}
              aria-pressed={sort === 'old'}
              onClick={() => setSort('old')}
            >
              Oldest
            </button>
          </div>
        ) : null}
      </div>

      <form className="comment-form" onSubmit={submit} noValidate>
        <p className="comment-form-title">
          {replyTo ? (
            <>
              Replying to <b>{replyTo.name}</b>
              <button type="button" className="comment-cancel" onClick={() => setReplyTo(null)}>
                Cancel
              </button>
            </>
          ) : (
            'Leave a comment'
          )}
        </p>

        <div className="comment-field">
          <label htmlFor="comment-name">Name</label>
          <input
            id="comment-name"
            name="name"
            autoComplete="name"
            maxLength={40}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder="Your name"
          />
        </div>

        <div className="comment-field">
          <label htmlFor="comment-body">Comment</label>
          <textarea
            id="comment-body"
            ref={textRef}
            name="comment"
            rows={4}
            maxLength={MAX}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (error) setError('');
            }}
            placeholder="Share a thought, a question or a correction…"
          />
        </div>

        <div className="comment-form-foot">
          <span className={`comment-hint${error ? ' is-error' : ''}`} role={error ? 'alert' : undefined}>
            {error || `${MAX - body.length} characters left · saved in this browser`}
          </span>
          <button className="btn p comment-submit" type="submit">
            <FaPaperPlane aria-hidden="true" />
            Post comment
          </button>
        </div>
      </form>

      <div className="comment-list" aria-live="polite">
        {comments === null ? (
          <p className="comments-loading">Loading comments…</p>
        ) : roots.length === 0 ? (
          <div className="comments-empty">
            <FaRegComment aria-hidden="true" />
            <p>No comments yet. Start the conversation above.</p>
          </div>
        ) : (
          roots.map((c) => {
            const replies = repliesFor(c.id);
            return (
              <article className="comment" id={`comment-${c.id}`} key={c.id}>
                {renderComment(c)}
                {replies.length ? (
                  <div className="comment-replies">
                    {replies.map((r) => (
                      <article className="comment comment--reply" id={`comment-${r.id}`} key={r.id}>
                        {renderComment(r, true)}
                      </article>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
