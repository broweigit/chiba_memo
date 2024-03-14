import { motion } from 'framer-motion';
import './loading.scss'; // 确保路径匹配您的项目结构

const LoadingComp = ({ isLoading }) => {
  return isLoading ? (
    <motion.div
      initial={{ scale: 0, x: '-50%', y: '-50%' }}
      animate={{ scale: 1, x: '-50%', y: '-50%' }}
      exit={{ scale: 0, x: '-50%', y: '-50%' }}
      className="local-loading-overlay"
    >
      <div className="local-loading-spinner"></div>
    </motion.div>
  ) : null;
};

export default LoadingComp;