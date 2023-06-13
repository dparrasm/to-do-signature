import React from 'react'
import { icons } from '../../utils/icons'
import './EnvelopeDetails.scss'
export default function EnvelopeDetails(props) {
  return (
    <tr className="envelope-details-row">
      <td></td>
      <td colSpan={5}>
        <div className="envelope-details-table-container">
          Details
          <div className="envelope-details-table-aspect">
            <table className="envelope-details-table">
              <colgroup>
                <col style={{ width: '30%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr className="envelope-details-table-head">
                  <th>User</th>
                  <th>Email</th>
                  <th>Needs to</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {props.recipients.map((r, index) => (
                  <tr key={index} className="envelope-details-table-row">
                    <td>{r.completedName}</td>
                    <td>{r.emailAddress}</td>
                    <td>{r.needsTo}</td>
                    <td className="envelope-details-status-data">
                      {r.isDone ? (
                        <div className="completed-icon-table-row">
                          <i className={icons.completedCircle}></i>
                          <h1>Completed</h1>
                        </div>
                      ) : (
                        <div className="incompleted-icon-table-row">
                          <i className={icons.waitingCircle}></i>
                          <h1>Pending</h1>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  )
}
