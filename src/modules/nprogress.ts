import NProgress from 'nprogress';
import '~/styles/nprogress.css';

export default () => {
	window.addEventListener('pinecone-start', () => NProgress.start());
	window.addEventListener('pinecone-end', () => NProgress.done());
}; 
