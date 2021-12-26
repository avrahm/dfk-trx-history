import dfkLogo from '../../assets/images/dfk-logo.png';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-div">
      <img src={dfkLogo} alt="dfk-logo" className="loading-logo" />
    </div>
  )
}

export default Loading;
