import aphrodite from 'aphrodite';
import aphroditeInterfaceWithRTLFactory from './aphroditeInterfaceWithRTLFactory';
import withRTLExtension from './utils/withRTLExtension';

export default aphroditeInterfaceWithRTLFactory(withRTLExtension(aphrodite));
