import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { formatRupiah } from 'src/shared/utils'
import moment from 'moment'

function OutStockTable({ data = [] }) {
  return (
    <div>
      <CTable hover striped responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Nama Barang</CTableHeaderCell>
            <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
            <CTableHeaderCell scope="col">Vendor</CTableHeaderCell>
            <CTableHeaderCell scope="col">Stok Keluar</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tanggal Keluar</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data?.map((d, idx) => {
            return (
              <CTableRow key={idx.toString()}>
                <CTableDataCell scope="row" align="middle">
                  {d?.inventory?.name || '-'}
                </CTableDataCell>
                <CTableDataCell align="middle">
                  {formatRupiah(d?.inventory?.price || 0)}
                </CTableDataCell>
                <CTableDataCell align="middle">{d?.vendor || '-'}</CTableDataCell>
                <CTableDataCell align="middle">{d?.out || 0}</CTableDataCell>
                <CTableDataCell align="middle">
                  {moment(d?.createdAt).format('DD/MM/YYYY') || '-'}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      {data && !data?.length && (
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            width: '100px',
            margin: '0 auto',
          }}
        >
          Data Kosong
        </div>
      )}
    </div>
  )
}

OutStockTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default OutStockTable
