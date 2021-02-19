import React, { useState } from 'react';
import {
  CButton,
  CCol,
  CFormGroup, CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle, CRow
} from "@coreui/react";
import './user.css';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as FormikHelper from './FormikHelper';

const TextForm = (props) => {
  return(
    <CCol md="6">
      <CFormGroup>
        <CLabel>{props.label}</CLabel>
        <Field type={props.type} className={props.type === 'password' ? 'type_password' : null} as={CInput} id={props.name} name={props.name} placeholder={`Isikan ${props.name}`}/>
        <ErrorMessage name={props.name} render={msg => <span style={{color : 'red', fontSize : 10, marginLeft : 5}}>{msg}</span>} />

      </CFormGroup>
    </CCol>
  )
}

const ModalTambahUserKomponent = ({Modal, ToggleModal, GetData}) => {
  const Token = JSON.parse(localStorage.getItem('token'));
  const [Loading, setLoading] = useState(false);


  const TambahDataPegawai = async (values, { setFieldError }) => {
    setLoading(true);
    await axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
      data : values,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    }).then(res => {
      GetData();
      ToggleModal();
    }).catch(err => {
      if(err.response.status){
        setFieldError(err.response.data.data.message[0].path, err.response.data.data.message[0].message)
      }
    });
    setLoading(false);
  }

  return(
    <CModal
      show={Modal}
      onClose={ToggleModal}
      closeOnBackdrop={false}
      size={'lg'}
    >
      <Formik
        initialValues={FormikHelper.InitialValues}
        validationSchema={FormikHelper.SignupSchema}
        onSubmit={TambahDataPegawai}
      >
        <Form>
          <CModalHeader closeButton>
            <CModalTitle>Tambah Data Pegawai</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
                  <TextForm name={'nama'} label={'Nama Pegawai'} type={'text'}/>
                  <TextForm name={'nip'} label={'NIP Pegawai'} type={'text'}/>
                  <TextForm name={'email'} label={'Email Pegawai'} type={'text'}/>
                  <TextForm name={'username'} label={'Username Pegawai'} type={'text'}/>
                  <TextForm name={'password'} label={'Password'} type={'password'}/>
                  <TextForm name={'c_password'} label={'Konfirmasi Password'} type={'password'}/>
                  <TextForm name={'agama'} label={'Agama'} type={'text'}/>
                  <TextForm name={'jenis_kelamin'} label={'Jenis Kelamin'} type={'text'}/>


                  <TextForm label={'Pendidikan Terakhir'} name={'tingkat_pendidikan'} type={'text'}/>
                  <TextForm label={'Tahun Lulus'} name={'tahun_lulus_pendidikan'} type={'text'}/>

                  <TextForm label={'Jabatan Pegawai'} name={'jabatan'} type={'text'} />
                  <TextForm label={'TMT Jabatan'} name={'tmt_jabatan'} type={'date'}/>
                  <TextForm label={'Tgl. SK Jabatan'} name={'tanggal_sk_jabatan'}  type={'date'} />
                  <TextForm label={'No. SK Jabatan'} name={'nomor_sk_jabatan'} type={'text'} />

                  <TextForm label={'Pangkat Pegawai'} name={'pangkat'} type={'text'} />
                  <TextForm label={'Eselon'} name={'eselon'} type={'text'} />

                  <TextForm label={'Golongan Pegawai'} name={'golongan'} type={'text'} />
                  <TextForm label={'TMT Golongan'} name={'tmt_golongan'} type={'text'}/>

            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton disabled={Loading} type='submit' color="primary">{Loading ? 'Loading...' : 'Tambah Pegawai'}</CButton>{' '}
            <CButton
              color="secondary"
              onClick={ToggleModal}
            >Cancel</CButton>
          </CModalFooter>
        </Form>
      </Formik>
    </CModal>
  )
}
const ModalTambahUser = React.memo(ModalTambahUserKomponent);
export default ModalTambahUser;
