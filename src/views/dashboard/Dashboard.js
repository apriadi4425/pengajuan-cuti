import React, {lazy, useContext, useEffect} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import TableSedangCuti from "./TableSedangCuti";
import TableAkanNaikPangkat from "./TableAkanNaikPangkat";
import {GlobalContext} from "../../globalState";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  const {DataKenaikanPangkat, GetKenaikanPangkat, AsyncToken} = useContext(GlobalContext);

  useEffect(() => {GetKenaikanPangkat(AsyncToken)}, [])
  return (
    <>
      <WidgetsDropdown />

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>Data Pegawai Yang akan naik pangkat Tahun Ini</strong>
            </CCardHeader>
            <CCardBody>
              <TableAkanNaikPangkat Data={DataKenaikanPangkat.tahun_ini}/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>Data Pegawai Yang akan naik pangkat Periode Mei</strong>
            </CCardHeader>
            <CCardBody>
              <TableAkanNaikPangkat  Data={DataKenaikanPangkat.periode_1}/>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>Data Pegawai Yang akan naik pangkat Periode Oktober</strong>
            </CCardHeader>
            <CCardBody>
              <TableAkanNaikPangkat  Data={DataKenaikanPangkat.periode_2}/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>Data Pegawai Yang sedang Cuti</strong>
            </CCardHeader>
            <CCardBody>
              <TableSedangCuti/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
