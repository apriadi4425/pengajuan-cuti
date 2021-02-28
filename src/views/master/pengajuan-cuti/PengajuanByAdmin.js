import React, { useState, useEffect, useContext } from 'react';
import {CBadge, CButton, CCard, CCardBody, CCardHeader, CCollapse, CDataTable} from "@coreui/react";
import ModalPengajuanCuti from "./modal-pengajuan-cuti/ModalPengajuanCuti";
import CustomModal from "../../konfigurasi/user/c_modal";
import {API} from "../../../helper";
import {GlobalContext} from "../../../globalState";
import {fields, JenisCuti, StatusCuti} from "./helper";
import CustomHooks from "../../konfigurasi/user/c_detail";

const PengajuanByAdmin = () => {
  const {AsyncToken} = useContext(GlobalContext)
  const [StateModalPengajuanCuti, ToggleModalPengajuanCuti] = CustomModal();
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [details, toggleDetails] = CustomHooks();



  const GetData = async () => {
    setLoading(true);
    await API('get','api/pengajuan/saya', null, AsyncToken)
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    setLoading(false);
  }

  const SetujuiPengajuan = async (Id) => {
    const data = {status : 2, pertimbangan_atasan_langsung : '', id : Id}
    await API('post', 'api/pengajuan/setujui', data, AsyncToken)
      .then(res => {
        console.log(res)
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
          Data Pengajuan Pegawai
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
              'dokument' : (item) => (
                <td>
                  <a href={`${process.env.REACT_APP_BASE_URL}/api/dokument/buat?id=${item.id}`} className='btn btn-sm btn-primary' color='primary'>Download</a>
                </td>
              ),
              'status' : (item) => (
                <td>
                  <CBadge color={StatusCuti(item.status)[1]}>
                    {StatusCuti(item.status)[0]}
                  </CBadge>
                </td>
              ),
              'show_details':
                (item, index)=>{
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={()=>{toggleDetails(item.id)}}
                      >
                        {details.includes(item.id) ? 'Sembunyi' : 'Tampilkan'}
                      </CButton>
                    </td>
                  )
                },
              'details':
                (item, index)=>{
                  return (
                    <CCollapse show={details.includes(item.id)}>
                      <CCardBody>
                       <h4>{item.nama}</h4>
                        <h6 className={'ml-3'}>Sisa Cuti : {item.sisa_cuti} hari</h6>
                        <h6 className={'ml-3'}>Alasan Cuti : {item.alasan_cuti}</h6>

                        <CButton className='mt-3' size="sm" color={'primary'}>Setujui</CButton>
                        <CButton className='mt-3 ml-3' size="sm" color={'warning'}>Tangguhkan</CButton>
                      </CCardBody>
                    </CCollapse>
                  )
                }
            }}
          />
        </CCardBody>
      </CCard>

      <ModalPengajuanCuti Modal={StateModalPengajuanCuti} ToggleModal={ToggleModalPengajuanCuti} GetData={GetData}/>
    </React.Fragment>
  )
}
export default React.memo(PengajuanByAdmin);
