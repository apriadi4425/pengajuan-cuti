import React, {useState, useCallback, useEffect} from 'react';
import {
  CCard,
  CCardBody, CCardHeader, CDataTable, CCollapse, CButton, CBadge
} from '@coreui/react'
import {fields, getBadge} from './helper'
import ModalTambahUser from "./ModalTambahUser";
import axios from "axios";
import swal from 'sweetalert';

const UserKonfigurasi = () => {
  const Token = JSON.parse(localStorage.getItem('token'));
  const [UserData, setUserData] = useState([])
  const [details, setDetails] = useState([])
  const [Loading, setLoading] = useState(true)

  const [initialValues, setinitialValues] = useState(null)

  //state modal tambah
  const [Modal, setModal] = useState(false);
  const ToggleModal = useCallback(() => {
    setModal(!Modal)
  }, [Modal])

  //state modal edit
  const [ModalEdit, setModalEdit] = useState(false);
  const ToggleModalEdit = useCallback(() => {
    setModalEdit(!ModalEdit)
  }, [ModalEdit])

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
      url : `${process.env.REACT_APP_BASE_URL}/api/user`,
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

  const ValidasiDelete = (IdUser) => {
    swal({
      title: "Anda Yakin?",
      text: "Ketika dihapus data tidak akan bisa kembali lagi",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          DeleteUser(IdUser)
        } else {
          swal("Data tidak jadi dihapus");
        }
      });
  }

  const DeleteUser = async (IdUser) => {
    setLoading(true)
    await axios({
      method : 'delete',
      url : `${process.env.REACT_APP_BASE_URL}/api/user`,
      data : {id : IdUser},
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    }).then(async res => {
       await GetData();
        swal("Berhasil, data berhasil dihapus", {
          icon: "success",
        });
    }).catch(err => {
      console.log(err)
    });
    setLoading(false)
  }

  useEffect(() => {
    GetData()
  }, [GetData])

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
                        <CButton onClick={async () => {
                          await setinitialValues(item);
                          ToggleModalEdit();
                        }} size="sm" color="info">
                          Ubah Data
                        </CButton>
                        <CButton onClick={() => ValidasiDelete(item.id)} size="sm" color="danger" className="ml-1">
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

      <ModalTambahUser Modal={Modal} ToggleModal={ToggleModal} GetData={GetData} initialValues={null}/>
      {
        initialValues !== null ?
        <ModalTambahUser Modal={ModalEdit} ToggleModal={ToggleModalEdit} GetData={GetData} initialValues={initialValues}/> : null
      }

    </>
  )
}

export default UserKonfigurasi;
