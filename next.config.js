/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Forces the browser (desktop and mobile) to save the PDF instead of opening it in a tab.
        source: '/resume.pdf',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Natesh_L_Resume.pdf"',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
