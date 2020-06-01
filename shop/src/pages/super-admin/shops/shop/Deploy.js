import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import useConfig from 'utils/useConfig'

import DeployButton from './_DeployButton'

const DeployShop = ({ shop }) => {
  const { config } = useConfig()
  const [deployments, setDeployments] = useState([])
  useEffect(() => {
    if (!config.backend) {
      return
    }
    fetch(`${config.backend}/shops/${shop.authToken}/deployments`, {
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((res) => {
        setDeployments(res.deployments)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [config.backend])

  return (
    <div>
      <DeployButton shop={shop} />
      {!deployments.length ? (
        <div className="mt-3">No deployments yet...</div>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Deployments</th>
              <th>IFPS</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {deployments.map((deployment, idx) => (
              <tr key={idx}>
                <td>{dayjs(deployment.createdAt).format('MMM D, h:mm A')}</td>
                <td>
                  <a
                    href={`${deployment.ipfsGateway}/ipfs/${deployment.ipfsHash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {deployment.ipfsHash.substr(0, 6)}
                    {'...'}
                    {deployment.ipfsHash.substr(-6)}
                  </a>
                </td>
                <td>
                  <a
                    href={`${deployment.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    children={deployment.domain}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default DeployShop
