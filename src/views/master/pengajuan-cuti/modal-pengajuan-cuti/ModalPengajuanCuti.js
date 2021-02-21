import React, {useContext} from 'react';
import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect
} from "@coreui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Helper from './helper';
import {GlobalContext} from "../../../../globalState";

const TextForm = (props) => {
  return(
    <CCol md="6">
      <CFormGroup>
        <CLabel>{props.label}</CLabel>
        <Field type={props.type} as={CInput} id={props.name} name={props.name} placeholder={`Isikan ${props.label}`}/>
        <ErrorMessage name={props.name} render={msg => <span style={{color : 'red', fontSize : 10, marginLeft : 5}}>{msg}</span>} />
      </CFormGroup>
    </CCol>
  )
}

const ModalPengajuanCuti = ({Modal, ToggleModal}) => {
  const {InitialValues} = Helper();
  const {ListUser} = useContext(GlobalContext)
  return(
    <CModal
      show={Modal}
      onClose={ToggleModal}
      closeOnBackdrop={false}
      size={'lg'}
    >
      <Formik initialValues={InitialValues}>
        <Form>
          <CModalHeader>
            <CModalTitle>Formulir Pengajuan Cuti</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>

              <CCol md="6">
                <CFormGroup>
                  <CLabel>Jenis Cuti</CLabel>
                  <Field name="jenis_cuti" as={CSelect}>
                    <option value={''}>Pilih Jenis Cuti</option>
                    <option value={1}>Cuti Tahunan</option>
                    <option value={2}>Cuti Besar</option>
                    <option value={3}>Cuti Sakit</option>
                    <option value={4}>Cuti Melahirkan</option>
                    <option value={5}>Cuti Karena Alasan Penting</option>
                    <option value={6}>Cuti di Luar Tanggungan Negara</option>
                  </Field>
                </CFormGroup>
              </CCol>
              <TextForm label={'Alasan Cuti'} type={'text'} name={'alasan_cuti'}/>
              <TextForm label={'Nama Ketua'} type={'text'} name={'nama_ketua'}/>
              <TextForm label={'NIP Ketua'} type={'text'} name={'nip_ketua'}/>

              <CCol md="6">
                <CFormGroup>
                  <CLabel>Atasan Langung</CLabel>
                  <Field name="atasan_langsung" as={CSelect}>
                    <option value={''}>Pilih Atasan Langsung</option>
                    {
                      ListUser.map((list, index) =>
                        <option key={index} value={list.id}>{list.nama} -- {list.jabatan}</option>
                      )
                    }
                  </Field>
                </CFormGroup>
              </CCol>
              <TextForm label={'Tanggal Pengajuan'} name={'tanggal_pengajuan'} type={'date'}/>

              <TextForm label={'Tanggal Mulai Cuti'} name={'tanggal_awal_cuti'} type={'date'}/>
              <TextForm label={'Tanggal Berakhir Cuti'} name={'tanggal_akhir_cuti'} type={'date'}/>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton type='submit' color="success">Ajukan Cuti</CButton>{' '}
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

export default React.memo(ModalPengajuanCuti)
