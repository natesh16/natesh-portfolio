import * as Si from 'react-icons/si';
import * as Fa from 'react-icons/fa';

// id -> react-icons export name. Lookup is by name with a fallback, so an
// icon missing from a react-icons release can never crash the page.
const NAMES = {
  javascript: 'SiJavascript', python: 'SiPython', cpp: 'SiCplusplus', c: 'SiC',
  react: 'SiReact', redux: 'SiRedux', html: 'SiHtml5', css: 'SiCss',
  tailwind: 'SiTailwindcss', bootstrap: 'SiBootstrap', next: 'SiNextdotjs',
  typescript: 'SiTypescript', node: 'SiNodedotjs', express: 'SiExpress',
  mongodb: 'SiMongodb', mongoose: 'SiMongoose', mysql: 'SiMysql', redis: 'SiRedis',
  sqlite: 'SiSqlite', socket: 'SiSocketdotio', axios: 'SiAxios', nginx: 'SiNginx',
  docker: 'SiDocker', compose: 'SiDocker', jenkins: 'SiJenkins', git: 'SiGit',
  github: 'SiGithub', githubactions: 'SiGithubactions', leaflet: 'SiLeaflet',
  gsap: 'SiGreensock', zod: 'SiZod', radix: 'SiRadixui',
  'react-hook-form': 'SiReacthookform', 'react-query': 'SiReactquery', zustand: 'FaCubes',
  aws: 'FaAws', ses: 'FaAws', 'aws-location': 'FaAws', ec2: 'FaServer', s3: 'FaCloud',
  vpc: 'FaNetworkWired', iam: 'FaShieldAlt', cloudwatch: 'FaChartLine', lambda: 'FaBolt',
  rest: 'FaPlug', api: 'FaExchangeAlt', jwt: 'FaShieldAlt', bcrypt: 'FaShieldAlt',
  cicd: 'FaCogs', agile: 'FaUsers', iac: 'FaCubes', monitoring: 'FaChartLine',
  security: 'FaShieldAlt', schematic: 'FaCode', sld: 'FaNetworkWired',
  controlpanel: 'FaCogs', mcc: 'FaBolt', plc: 'FaCubes', wiring: 'FaPlug',
  bullmq: 'FaCubes', recharts: 'FaChartLine',
};

export function getIcon(id) {
  const name = NAMES[id];
  return (name && (Si[name] || Fa[name])) || Fa.FaCode;
}
