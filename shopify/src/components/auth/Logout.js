import observer from '../../infrastructure/observer';
import messageHelper from '../../utils/messageHelper';

const logout = () => {
  observer.trigger(observer.events.logoutUser, null);
  localStorage.clear();
  messageHelper.push('success', 'Logout successful!');
};

export default logout;
