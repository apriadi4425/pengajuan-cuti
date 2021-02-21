import React from 'react';
import {CButton, CCard, CCardBody, CCardHeader} from "@coreui/react";
import ModalPengajuanCuti from "./modal-pengajuan-cuti/ModalPengajuanCuti";
import CustomModal from "../../konfigurasi/user/c_modal";

const PengajuanByUser = () => {
  const [StateModalPengajuanCuti, ToggleModalPengajuanCuti] = CustomModal();

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
