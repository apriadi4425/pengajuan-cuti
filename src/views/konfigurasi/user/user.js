import React, {useState, useCallback, useEffect} from 'react';
import {
  CBadge, CButton,
  CCard,
  CCardBody, CCardHeader, CCollapse, CDataTable
} from '@coreui/react'
import axios from "axios";
import {fields, getBadge} from './helper'
import CustomHooks from "./c_detail";
import CustomModal from "./c_modal";
import ModalTambahUser from "./ModalTambahUser";

const UserBiasaKomponent = () => {
  const Token = JSON.parse(localStorage.getItem('token'));
  const [UserData, setUserData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [details, toggleDetails] = CustomHooks();
  const [initialValues, setinitialValues] = useState(null)
  const [ModalEdit, ToggleModalEdit] = CustomModal();


  const GetData = async () => {
    await axios({
      method : 'get',
      url : `${process.env.REACT_APP_BASE_URL}/api/user/list-saya`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    }).then(res => {
      setUserData(res.data.data)
    }).catch(err => {
      console.log(err)
    });
    setLoading(false)
  }

  useEffect(() => {
    GetData();
  },[])

  return(
    <>
      <CCard>
        <CCardHeader>
          Data diri saya
          <div className='float-right'>

          </div>
        </CCardHeader>

        <CCardBody>
          <CDataTable
            items={UserData}
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
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
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
                        <h4>
                          {item.username}
                        </h4>
                        <p className="text-muted">User since: {item.registered}</p>
                        <CButton  onClick={async () => {
                          await setinitialValues(item);
                          ToggleModalEdit();
                        }} size="sm" color="info">
                          Ubah Data
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  )
                }
            }}
          />
        </CCardBody>
      </CCard>
      {
        initialValues !== null ?
          <ModalTambahUser Modal={ModalEdit} ToggleModal={ToggleModalEdit} GetData={GetData} initialValues={initialValues}/> : null
      }
    </>
  )
}

const UserBiasa = React.memo(UserBiasaKomponent)
export default UserBiasa;
