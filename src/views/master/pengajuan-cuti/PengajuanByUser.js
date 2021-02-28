import React, { useState, useEffect, useContext } from 'react';
import {CBadge, CButton, CCard, CCardBody, CCardHeader, CDataTable} from "@coreui/react";
import ModalPengajuanCuti from "./modal-pengajuan-cuti/ModalPengajuanCuti";
import CustomModal from "../../konfigurasi/user/c_modal";
import {API} from "../../../helper";
import {GlobalContext} from "../../../globalState";
import {fieldsUser, JenisCuti, StatusCuti} from "./helper";

const PengajuanByUser = () => {
  const {AsyncToken} = useContext(GlobalContext)
  const [StateModalPengajuanCuti, ToggleModalPengajuanCuti] = CustomModal();
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [SisaCuti, setSisaCuti] = useState(null)

  const GetData = async () => {
    setLoading(true);
    await API('get','api/pengajuan/saya', null, AsyncToken)
      .then(res => {
        setData(res.data.data)
        setSisaCuti(res.data.sisa_cuti)
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
          Data Pengajuan Cuti Saya <strong>({Loading ? '...' : `Sisa Cuti : ${SisaCuti}`})</strong>
          <div className='float-right'>
            <CButton disabled={SisaCuti === 0} onClick={ToggleModalPengajuanCuti} size="sm" color="success">+ Ajukan Cuti</CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={Data}
            fields={fieldsUser}
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
              ),
              'dokument' : (item) => (
                <td>
                  <a href={`${process.env.REACT_APP_BASE_URL}/api/dokument/buat?id=${item.id}`} className='btn btn-sm btn-primary' color='primary'>Download</a>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>

      <ModalPengajuanCuti Modal={StateModalPengajuanCuti} ToggleModal={ToggleModalPengajuanCuti} GetData={GetData}/>
    </React.Fragment>
  )
}
export default React.memo(PengajuanByUser);
