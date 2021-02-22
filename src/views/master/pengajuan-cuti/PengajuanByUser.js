import React, { useState, useEffect, useContext } from 'react';
import {CBadge, CButton, CCard, CCardBody, CCardHeader, CCollapse, CDataTable} from "@coreui/react";
import ModalPengajuanCuti from "./modal-pengajuan-cuti/ModalPengajuanCuti";
import CustomModal from "../../konfigurasi/user/c_modal";
import {API} from "../../../helper";
import {GlobalContext} from "../../../globalState";
import {fields, JenisCuti, StatusCuti} from "./helper";

const PengajuanByUser = () => {
  const {AsyncToken} = useContext(GlobalContext)
  const [StateModalPengajuanCuti, ToggleModalPengajuanCuti] = CustomModal();
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);



  const GetData = async () => {
    setLoading(true);
    await API('get','api/pengajuan/saya', null, AsyncToken)
      .then(res => {
        setData(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    setLoading(false);
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
          <CDataTable
            items={Data}
            fields={fields}
            columnFilter
            noItemsView={Loading ?  {noItems: '... Mengambil Data'} :  {noResults: 'Pencarian Tidak Ditemukan', noItems: 'Tidak Ada Data'}}
            loading={Loading}
            itemsPerPage={10}
            hover
            striped={true}
            footer={true}
            sorter
            pagination
            scopedSlots = {{
              'jenis_cuti' : (item) => (
                <td>
                  {JenisCuti(item.jenis_cuti)}
                </td>
              ),
              'status' : (item) => (
                <td>
                  <CBadge color={StatusCuti(item.status)[1]}>
                    {StatusCuti(item.status)[0]}
                  </CBadge>
                </td>
              )
            }}
          />
        </CCardBody>
      </CCard>

      <ModalPengajuanCuti Modal={StateModalPengajuanCuti} ToggleModal={ToggleModalPengajuanCuti} GetData={GetData}/>
    </React.Fragment>
  )
}
export default React.memo(PengajuanByUser);
