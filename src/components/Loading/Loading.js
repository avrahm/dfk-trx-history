import dfkLogo from '../../assets/images/dfk-logo.png';
import './Loading.css';

function Loading() {
  return (
    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <img src={dfkLogo} alt="dfk-logo" className="loading-logo" />
    </div>
  )
}

export default Loading;
