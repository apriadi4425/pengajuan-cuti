import React, { useState, useEffect, useContext } from 'react';
import {CButton, CCard, CCardBody, CCardHeader} from "@coreui/react";
import ModalPengajuanCuti from "./modal-pengajuan-cuti/ModalPengajuanCuti";
import CustomModal from "../../konfigurasi/user/c_modal";
import {API} from "../../../helper";
import {GlobalContext} from "../../../globalState";

const PengajuanByUser = () => {
  const {AsyncToken} = useContext(GlobalContext)
  const [StateModalPengajuanCuti, ToggleModalPengajuanCuti] = CustomModal();
  const [Data, setData] = useState([]);

  const GetData = async () => {
    await API('get','api/pengajuan/saya', null, AsyncToken)
      .then(res => {
        console.log(res.data.data)
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    GetData();
  }, [])

  return(
    <React.Fragment>
      <CCard>
        <CCardHeader>
          Data Pengajuan Cuti Saya
          <div className='float-right'>
            <CButton onClick={ToggleModalPengajuanCuti} size="sm" color="success">+ Ajukan Cuti</CButton>
          </div>
        </CCardHeader>

        <CCardBody>

        </CCardBody>
      </CCard>

      <ModalPengajuanCuti Modal={StateModalPengajuanCuti} ToggleModal={ToggleModalPengajuanCuti}/>
    </React.Fragment>
  )
}
export default React.memo(PengajuanByUser);
