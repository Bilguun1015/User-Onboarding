import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const UserTable = ({ userName, userEmail }) => (  
      <Table.Row>
        <Table.Cell>
          <Label>{userName}</Label>
        </Table.Cell>
        <Table.Cell>{userEmail}</Table.Cell>
      </Table.Row>
)

export default UserTable


