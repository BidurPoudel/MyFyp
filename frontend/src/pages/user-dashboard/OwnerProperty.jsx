import React from 'react'

const OwnerProperty = () => {
  function handleUpdate(){
    alert('update')
  }
  function handleDelete(){
    alert('delete')
  }
  return (
    <div>
     <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
        <table className="table my-2 boder-2" id="dataTable">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Property</th>
              <th>Address of Property</th>
              <th>Tenant Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td className='flex'>
                <button className="action-btn" type="button"  data-bs-target="#edit-addin-modal" data-bs-toggle="modal">
                Update 
                </button>
                <button className="action-btn" type="button" data-bs-target="#delete-addin-modal" data-bs-toggle="modal">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td><strong>ID</strong></td>
              <td><strong>Name</strong></td>
              <td><strong>Price</strong></td>
              <td><strong>Created At</strong></td>
              <td><strong>Updated At</strong></td>
              <td><strong>Actions</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default OwnerProperty
