import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default () => {
	window.addEventListener('pinecone-start', () => nProgress.start());
	window.addEventListener('pinecone-end', () => nProgress.done());
};
