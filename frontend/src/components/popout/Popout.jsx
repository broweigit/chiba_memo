import { motion } from 'framer-motion';
import './popout.scss';

const Popout = ({ isPopoutOpen, popoutContent, popoutType, closePopout }) => {
  return isPopoutOpen ? (
    <motion.div
      initial={{ scale: 0, x: '-50%' }}
      animate={{ scale: 1, x: '-50%' }}
      exit={{ scale: 0, x: '-50%' }}
      className={`popout ${popoutType}`}
      onClick={closePopout}
    >
      {popoutContent}
    </motion.div>
  ) : null;
};

export default Popout;