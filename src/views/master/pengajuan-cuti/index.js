import {useContext} from 'react';
import {GlobalContext} from "../../../globalState";
import PengajuanByUser from "./PengajuanByUser";

const PengajuanCuti = () => {
  const {User} = useContext(GlobalContext)
  return (
    User.otoritas === 2 ?
    <PengajuanByUser/> : null
  )
}

export default PengajuanCuti;
