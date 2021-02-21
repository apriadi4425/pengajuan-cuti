import React from 'react';
import {CButton, CCard, CCardBody, CCardHeader} from "@coreui/react";
const PengajuanByUser = () => {
  return(
    <CCard>
      <CCardHeader>
        Data Pengajuan Cuti Saya
        <div className='float-right'>
          <CButton size="sm" color="primary">+ Ajukan Cuti</CButton>
        </div>
      </CCardHeader>

      <CCardBody>

      </CCardBody>
    </CCard>
  )
}
export default React.memo(PengajuanByUser);
