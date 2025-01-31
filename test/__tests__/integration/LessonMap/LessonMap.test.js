import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Route from 'react-router-dom/Route'
import config from 'config'
import Link from 'react-router-dom/Link'
import MemoryRouter from 'react-router-dom/MemoryRouter'

import { notCombined } from '../../../../src/reducers/index'
// make sure to import your connected component
import TopBar from '../../../../src/TopBar/TopBar'

import { setupIntegrationTest, flushAllPromises } from '../../../integrationSetup'
import ACTIONS from '../../../../src/constants/ACTIONS'


describe('integration tests', () => {
  let chesterAdminIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YTI2MmYzY2Q3OTk3NDdiMjU3YWNlNDEiLCJyb2xlcyI6W3siaXNBZG1pbiI6dHJ1ZX1dfSwibmlja25hbWUiOiJjaGVzdGVydGhldGVzdGVyIiwibmFtZSI6ImNoZXN0ZXJ0aGV0ZXN0ZXJAa2l3aWNvbXB1dGUuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzkwYTk5N2ZlMWNlNWM4ZTAyNWQ4NjY3YzI0ZWY1Nzc5P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGY2gucG5nIiwidXBkYXRlZF9hdCI6IjIwMTctMTItMTNUMDA6MzU6NTcuNTkzWiIsImVtYWlsIjoiY2hlc3RlcnRoZXRlc3RlckBraXdpY29tcHV0ZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9raXdpLWludGVncmF0aW9uLXRlc3QuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVhMjYyZjNjNDUxNTc3MTFiZTgyYmFjMCIsImF1ZCI6Ik5nakxRdFJiUDdXZHNfX1J1MTBnN3FQbkpRVDdMbjZaIiwiaWF0IjoxNTEzMTI1MzU3LCJleHAiOjE1MTMxNjEzNTd9.PXmHGo_Q1mtvw_feGF1NY3uxjsBPEKTPYikKHoiLoVGjw1jmiwztZ7okKddfk8s8oqDeH7Htrfl7vqbDSA8EedZX9aExNAwu3MgIW3p2LKp0STsp9Zuz1NlrAIX__nsnB22Bhn8tvbYyRFqyhtZ1__lmg-w2ouQ3lZuf00Xd-V5QEnzuBbykSi3IcVbx1oUdqqvi7bz-U6RRP_cBMhbgsbD1pEDcX5vnLQMqWeZHweTq43tpwQcKciNz21LMB4fPs5LbIPU3mglkkfObJl4x4k0BdEYjZ0Qn42VMRI7VSpRibP0DfRvWhx3edp0mX0zDGm08R8n7LUuXYxfZvGfocw'
  let chesterProviderIdToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IlJqSTNNRVV4UlRoR1JVSXlNRVEzUkVGQk1rSXlSa1JGTUVZek16RkVNamRGT1RaR1FUVTRSUSJ9.eyJodHRwczovL2ludGVncmF0aW9uLXRlc3Qua2l3aWNvbXB1dGUuY29tL2FwcF9tZXRhZGF0YSI6eyJ1c2VySWQiOiI1YjcyM2Q3YTVmMWQ3MTRlMGYwZTEzN2YiLCJyb2xlcyI6W3siaXNQcm92aWRlciI6dHJ1ZX1dLCJ0ZW1wb3JhcnlQYXNzd29yZCI6ImJsYWhibGFoYmxhaCIsInVzZXJuYW1lIjoiZmFrZXVzZXJuYW1lNTY3ODMifSwibmlja25hbWUiOiJmYWtldXNlcm5hbWU1Njc4MyIsIm5hbWUiOiJzb3Vwc3RhY2hlK2ludGVncmF0aW9uK2Zha2V1c2VybmFtZTU2NzgzQGtpd2ljb21wdXRlLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8xMmVhYjI2MmFlZTAzOTkwZDc3NDE1YTYyZGUyOWFjZj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnNvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE4LTA4LTE0VDAyOjI1OjAxLjUyMFoiLCJlbWFpbCI6InNvdXBzdGFjaGUraW50ZWdyYXRpb24rZmFrZXVzZXJuYW1lNTY3ODNAa2l3aWNvbXB1dGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2tpd2ktaW50ZWdyYXRpb24tdGVzdC5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWI3MjNkN2E4NTdjYTIwZmU5NGRiY2I2IiwiYXVkIjoiTmdqTFF0UmJQN1dkc19fUnUxMGc3cVBuSlFUN0xuNloiLCJpYXQiOjE1MzQyMTM1MDEsImV4cCI6MTUzNDI0OTUwMX0.-7pskJt74jzEoosbCOGkoxUeVaZAidn_tRfsszE-P5A'
    , chesterAdminUserId = '5a262f3cd799747b257ace41'
    , store
    , dispatchSpy
    , router
    , component
    , mounter
    , isAdmin

  beforeEach(() => {
    router = {}
    ;({store, dispatchSpy} = setupIntegrationTest(notCombined, router))

    mounter = (props = {}) => {
      return mount(
        <MemoryRouter initialEntries={[ '/' ]}>
          <Provider store={ store }>
            <TopBar { ...props } />
          </Provider>
        </MemoryRouter>
        , {
          context: {
            muiTheme: getMuiTheme()
          },
          childContextTypes: {
            muiTheme: PropTypes.object.isRequired
          }
        })
    }
  })

  describe('With breadcrumb', () => {
    beforeEach(async () => {
      component = mounter()
      component.update()
    })

    it('should not render logo', () => {

    })
  })


})