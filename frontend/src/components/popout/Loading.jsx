import { motion } from 'framer-motion';
import './loading.scss';

const Loading = ({ isLoading }) => {
  return isLoading ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-overlay"
    >
      <div className="loading-spinner"></div>
    </motion.div>
  ) : null;
};

export default Loading;
