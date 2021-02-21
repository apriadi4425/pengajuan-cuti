import { useContext } from 'react';
import {GlobalContext} from "../../../../globalState";

const Helper = () => {
  const {User, Konfig} = useContext(GlobalContext)
  const InitialValues = {
    user_id : User.id,
    atasan_langsung : User.atasan_langsung,
    nama_ketua : Konfig.nama_ketua,
    nip_ketua : Konfig.nip_ketua,
    tanggal_pengajuan : '',
    tanggal_awal_cuti : '',
    tanggal_akhir_cuti : '',
    jenis_cuti : '',
    alasan_cuti : '',
  }

  return { InitialValues }
}

export default Helper;
