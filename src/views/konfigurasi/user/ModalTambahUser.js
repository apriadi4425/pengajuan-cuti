import React, { useState } from 'react';
import {
  CButton,
  CCol,
  CFormGroup, CFormText, CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle, CRow
} from "@coreui/react";
import './user.css';
import axios from "axios";

const TextForm = (props) => {
  return (
      <CCol md="6">
        <CFormGroup>
          <CLabel>{props.label}</CLabel>
          <CInput className={props.type === 'password' ? 'type_password' : null} id={props.id} name={props.id} placeholder={`Isikan ${props.label}`} value={props.value} onChange={props.onChange}/>
          {
            props.required === false ?
              <CFormText className="help-block">Kolom boleh dikosonglan</CFormText> : null
          }
        </CFormGroup>
      </CCol>
  )
}

const ModalTambahUserKomponent = ({Modal, ToggleModal}) => {
  const Token = JSON.parse(localStorage.getItem('token'));

  const [Form, setForm] = useState({
    username : '' , password :  '', c_password : '', email :  '', nama :  '', nip :  '', jabatan :  '', golongan :  '', pangkat :  '' , tingkat_pendidikan :  '', tahun_lulus_pendidikan :  '', tempat_lahir :  '', tanggal_lahir :  '', jenis_kelamin :  '', agama :  '', status_kawin :  '', tmt_pns :  '', tmt_cpns :  '', tmt_golongan :  '', tanggal_sk_golongan :  '', eselon :  '', tmt_jabatan :  '', tanggal_sk_jabatan :  '', nomor_sk_jabatan : ''
  })

  const HandleForm = (e) => {
    setForm({...Form, [e.target.name] : e.target.value})
  }

  const TambahDataPegawai = async () => {
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
      data : Form,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    }).then(res => {
       console.log(res.data)
    }).catch(err => {
      console.log(err)
    });
  }

  return(
    <CModal
      show={Modal}
      onClose={ToggleModal}
      size={'lg'}
    >
      <CModalHeader closeButton>
        <CModalTitle>Tambah Data Pegawai</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <TextForm label={'Nama Pegawai'} id={'nama'} value={Form.nama} onChange={HandleForm} type={'text'} required={true}/>
          <TextForm label={'NIP Pegawai'} id={'nip'} value={Form.nip} onChange={HandleForm} type={'text'} required={true}/>
          <TextForm label={'Username Pegawai'} id={'username'} value={Form.username} onChange={HandleForm} type={'text'} required={true}/>
          <TextForm label={'Email Pegawai'} id={'email'} value={Form.email} onChange={HandleForm} type={'text'} required={true}/>
          <TextForm label={'Password'} id={'password'} value={Form.password} onChange={HandleForm} type={'password'} required={true}/>
          <TextForm label={'Konfirmasi Password'} id={'c_password'} value={Form.c_password} onChange={HandleForm} type={'password'} required={true}/>

          <TextForm label={'Agama'} id={'agama'} value={Form.agama} onChange={HandleForm} type={'text'} required={false}/>
          <TextForm label={'Jenis Kelamin'} id={'jenis_kelamin'} value={Form.jenis_kelamin} onChange={HandleForm} type={'text'} required={false}/>

          <TextForm label={'Pendidikan Terakhir'} id={'tingkat_pendidikan'} value={Form.tingkat_pendidikan} onChange={HandleForm} type={'text'} required={false}/>
          <TextForm label={'Tahun Lulus'} id={'tahun_lulus_pendidikan'} value={Form.tahun_lulus_pendidikan} onChange={HandleForm} type={'text'} required={false}/>

          <TextForm label={'Jabatan Pegawai'} id={'jabatan'} value={Form.jabatan} onChange={HandleForm} type={'text'} required={true}/>
          <TextForm label={'TMT Jabatan'} id={'tmt_jabatan'} value={Form.tmt_jabatan} onChange={HandleForm} type={'date'} required={false}/>
          <TextForm label={'Tgl. SK Jabatan'} id={'tanggal_sk_jabatan'} value={Form.tanggal_sk_jabatan} onChange={HandleForm} type={'date'} required={false}/>
          <TextForm label={'No. SK Jabatan'} id={'nomor_sk_jabatan'} value={Form.nomor_sk_jabatan} onChange={HandleForm} type={'text'} required={false}/>

          <TextForm label={'Pangkat Pegawai'} id={'pangkat'} value={Form.pangkat} onChange={HandleForm} type={'text'} required={true}/>
          <TextForm label={'Eselon'} id={'eselon'} value={Form.eselon} onChange={HandleForm} type={'text'} required={false}/>

          <TextForm label={'Golongan Pegawai'} id={'golongan'} value={Form.golongan} onChange={HandleForm} type={'text'} required={false}/>
          <TextForm label={'TMT Golongan'} id={'tmt_golongan'} value={Form.tmt_golongan} onChange={HandleForm} type={'text'} required={false}/>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton onClick={TambahDataPegawai} color="primary">Do Something</CButton>{' '}
        <CButton
          color="secondary"
          onClick={ToggleModal}
        >Cancel</CButton>
      </CModalFooter>
    </CModal>
  )
}
const ModalTambahUser = React.memo(ModalTambahUserKomponent);
export default ModalTambahUser;
