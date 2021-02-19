import React, {useState, useCallback, useEffect} from 'react';
import {
  CCard,
  CCardBody, CCardHeader, CDataTable, CCollapse, CButton, CBadge
} from '@coreui/react'
import {fields, getBadge} from './helper'
import ModalTambahUser from "./ModalTambahUser";
import axios from "axios";

const UserKonfigurasi = () => {
  const Token = JSON.parse(localStorage.getItem('token'));
  const [UserData, setUserData] = useState([])
  const [details, setDetails] = useState([])
  const [Loading, setLoading] = useState(true)

  //state modal
  const [Modal, setModal] = useState(false);
  const ToggleModal = useCallback(() => {
    setModal(!Modal)
  }, [Modal])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const GetData = useCallback(async () => {
    await axios({
      method : 'get',
      url : `${process.env.REACT_APP_BASE_URL}/api/user/all`,
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
  },[])

  useEffect(() => {
    GetData()
  }, [])

  return(
    <>
      <CCard>
        <CCardHeader>
          Data Kepegawaian
          <div className='float-right'>
            <CButton onClick={ToggleModal} size="sm" color="primary">+ Tambah Pegawai</CButton>
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
                        onClick={()=>{toggleDetails(index)}}
                      >
                        {details.includes(index) ? 'Hide' : 'Show'}
                      </CButton>
                    </td>
                  )
                },
              'details':
                (item, index)=>{
                  return (
                    <CCollapse show={details.includes(index)}>
                      <CCardBody>
                        <h4>
                          {item.username}
                        </h4>
                        <p className="text-muted">User since: {item.registered}</p>
                        <CButton size="sm" color="info">
                          User Settings
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1">
                          Delete
                        </CButton>
                      </CCardBody>
                    </CCollapse>
                  )
                }
            }}
          />
        </CCardBody>
      </CCard>

      <ModalTambahUser Modal={Modal} ToggleModal={ToggleModal} GetData={GetData}/>
    </>
  )
}

export default UserKonfigurasi;
