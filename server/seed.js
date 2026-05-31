require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Skill = require('./models/Skill');
const Service = require('./models/Service');
const Project = require('./models/Project');
const Certificate = require('./models/Certificate');
const Profile = require('./models/Profile');
const Experience = require('./models/Experience');
const Education = require('./models/Education');

const skills = [
  { name: 'JavaScript', percentage: 85, category: 'Languages', order: 1 },
  { name: 'Python', percentage: 75, category: 'Languages', order: 2 },
  { name: 'C++', percentage: 70, category: 'Languages', order: 3 },
  { name: 'SQL', percentage: 75, category: 'Languages', order: 4 },
  { name: 'React.js', percentage: 90, category: 'Frontend', order: 5 },
  { name: 'HTML / CSS', percentage: 90, category: 'Frontend', order: 6 },
  { name: 'Tailwind CSS', percentage: 85, category: 'Frontend', order: 7 },
  { name: 'React Native', percentage: 65, category: 'Frontend', order: 8 },
  { name: 'Node.js / Express', percentage: 70, category: 'Backend', order: 9 },
  { name: 'MongoDB', percentage: 75, category: 'Backend', order: 10 },
  { name: 'LangChain / RAG', percentage: 60, category: 'AI/ML', order: 11 },
  { name: 'Git / GitHub', percentage: 85, category: 'Tools', order: 12 },
  { name: 'Figma', percentage: 70, category: 'Tools', order: 13 },
];

const services = [
  {
    title: 'Frontend Development',
    description: 'Build modern, responsive UIs with React.js, Tailwind CSS, and component-based architecture optimized for performance and UX.',
    icon: 'monitor',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript'],
    order: 1,
  },
  {
    title: 'Full Stack Web Apps',
    description: 'End-to-end MERN stack applications: React frontend, Node/Express backend, MongoDB database, with REST API integration.',
    icon: 'layers',
    tags: ['MongoDB', 'Express.js', 'Node.js'],
    order: 2,
  },
  {
    title: 'React Native Mobile Apps',
    description: 'Cross-platform mobile applications using React Native with clean UI, smooth navigation, and native performance.',
    icon: 'smartphone',
    tags: ['React Native', 'Mobile', 'Cross-Platform'],
    order: 3,
  },
  {
    title: 'AI/ML Integration',
    description: 'Integrate RAG pipelines, LangChain, recommendation systems, and LLM-powered features into web applications.',
    icon: 'cpu',
    tags: ['LangChain', 'RAG', 'Python'],
    order: 4,
  },
  {
    title: 'Database Design',
    description: 'SQL (MySQL) and NoSQL (MongoDB) database design with optimized schemas, stored procedures, and queries.',
    icon: 'database',
    tags: ['MySQL', 'MongoDB', 'PostgreSQL'],
    order: 5,
  },
  {
    title: 'API Development',
    description: 'RESTful API development with Node.js/Express, JWT authentication, and integration with third-party services.',
    icon: 'code',
    tags: ['REST API', 'JWT', 'Node.js'],
    order: 6,
  },
];

const projects = [
  {
    title: 'Recruitment Management System',
    category: 'Full Stack',
    description: 'Full-stack recruitment platform enabling job applications, resume uploads, and application tracking. HR side manages postings, applicants, and interviews. Integrated with Cloudinary for file handling and Gmail SMTP for notifications.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Gmail SMTP'],
    github: 'https://github.com/Haseebzahid9',
    live: '#',
    featured: true,
    order: 1,
  },
  {
    title: 'Banking Management System',
    category: 'Database',
    description: 'Banking system with MySQL for accounts, transactions, and loans. Features stored procedures, triggers, and a simple admin panel built with HTML, CSS, and JavaScript.',
    technologies: ['MySQL', 'HTML', 'CSS', 'JavaScript', 'Stored Procedures', 'Triggers'],
    github: 'https://github.com/Haseebzahid9',
    live: '#',
    featured: false,
    order: 2,
  },
  {
    title: 'Social Media Platform (C++ DSA)',
    category: 'DSA',
    description: 'C++ system combining hash tables, graphs, linked lists, stacks, queues, and AVL trees for user management, friendships, posts, messaging, notifications, and ranking.',
    technologies: ['C++', 'Hash Tables', 'Graphs', 'AVL Trees', 'Linked Lists'],
    github: 'https://github.com/Haseebzahid9',
    live: '#',
    featured: false,
    order: 3,
  },
  {
    title: 'AI Movie Recommendation System',
    category: 'AI/ML',
    description: 'Movie recommendation system using K-means clustering and neural networks (ANN) to generate ranked suggestions from user preferences, with CSP filtering and a Streamlit UI.',
    technologies: ['Python', 'K-means', 'ANN', 'Streamlit', 'Scikit-learn', 'NumPy', 'Pandas'],
    github: 'https://github.com/Haseebzahid9',
    live: '#',
    featured: true,
    order: 4,
  },
  {
    title: 'PhantomTrace — Hand Tracking AR',
    category: 'AI/ML',
    description: 'Browser-based AR app using MediaPipe Hands for real-time hand tracking and gesture interaction. Features air drawing, gesture recognition (pinch/fist), dynamic visuals, and interactive audio.',
    technologies: ['JavaScript', 'MediaPipe', 'HTML5 Canvas', 'Web Audio API', 'Computer Vision'],
    github: 'https://github.com/Haseebzahid9',
    live: '#',
    featured: true,
    order: 5,
  },
];

const seed = async () => {
  await connectDB();
  await Admin.deleteMany();
  await Skill.deleteMany();
  await Service.deleteMany();
  await Project.deleteMany();
  await Certificate.deleteMany();
  await Profile.deleteMany();
  await Experience.deleteMany();
  await Education.deleteMany();

  await Admin.create({ name: 'Haseeb Raza', email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
  await Skill.insertMany(skills);
  await Service.insertMany(services);
  await Project.insertMany(projects);
  await Profile.create({
    name: 'Haseeb Raza',
    title: 'Frontend Developer',
    bioshort: 'Passionate CS student at FAST-NUCES. Enthusiastic about Frontend Development and AI/ML. I love building clean, scalable web applications and exploring cutting-edge technologies.',
    biolong: 'As a Frontend Developer and CS student at FAST-NUCES, I specialize in building modern, responsive web applications using React.js and the MERN stack. My experience spans from developing clean component-based UIs to integrating AI/ML features like RAG pipelines and recommendation systems.',
    phone: '+92 3184006367',
    email: 'haseebzahid4998@gmail.com',
    city: 'Lahore, Pakistan',
    degree: 'BS Computer Science',
    freelance: 'Available',
    github: 'https://github.com/Haseebzahid9',
    linkedin: 'https://www.linkedin.com/in/haseebraza4998/',
    instagram: 'https://www.instagram.com/haseebzahid_/',
  });
  await Experience.insertMany([
    { role: 'React Developer Intern', company: 'Amrood Labs (Pvt) Ltd', location: 'Lahore, Pakistan', period: 'June 2025 – August 2025', points: ['Developed frontend features with React.js, JavaScript (ES6), HTML, CSS, Tailwind CSS', 'Built responsive interfaces using component-based architecture and state management', 'Contributed to Agile workflows through code reviews and team collaboration'], order: 1 },
  ]);
  await Education.insertMany([
    { degree: 'BS Computer Science', institution: 'FAST-NUCES', period: '2023 – 2027', coursework: 'OOP, Data Structures & Algorithms, DBMS, Computer Networking, Operating Systems, Artificial Intelligence', order: 1 },
  ]);
  await Certificate.insertMany([
    { title: 'SkillUP in Excel 2019', issuer: 'EDUCBA', date: '2023', category: 'Other', description: 'Comprehensive Excel 2019 training covering formulas, pivot tables, data analysis and automation.', skills: ['Excel', 'Data Analysis', 'Pivot Tables'], credentialUrl: '', order: 1 },
    { title: 'Responsive Website Development (HTML, CSS, JS)', issuer: 'EDUCBA', date: '2023', category: 'Web Development', description: 'HTML, CSS, and JavaScript fundamentals for building responsive, modern websites.', skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'], credentialUrl: '', order: 2 },
    { title: 'Technical SEO Course', issuer: 'Semrush', date: '2024', category: 'Other', description: 'Advanced technical SEO strategies including site architecture, crawlability, and performance optimization.', skills: ['SEO', 'Site Architecture', 'Performance'], credentialUrl: '', order: 3 },
    { title: 'Certificate of Appreciation – Webinar Hosting', issuer: 'UWorx Group', date: '2024', category: 'Other', description: 'Awarded for successfully hosting and managing a professional webinar event.', skills: ['Communication', 'Event Management', 'Public Speaking'], credentialUrl: '', order: 4 },
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
