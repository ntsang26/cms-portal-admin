import { Col, DatePicker, Input, Select } from 'antd'
import React from 'react'
const { Group } = Input
const { Option } = Select

const FilterInput = (props) => {
  const { query, lsFilterField } = props
  const getFilterInput = (item) => {
    const { type, field, name } = item
    let filterInput = null
    switch (type) {
      case 'date':
        filterInput = (
          <Group compact>
            <Select
              defaultValue='$eq'
              size='large'
              style={{ width: '100px' }}
              value={query[field]?.operator || '$eq'}
              onChange={(operator) => {
                props.handleOnChangeQuery({ operator, field })
              }}
            >
              <Option value='$eq'>Equal</Option>
              <Option value='$gt'>Grater than</Option>
              <Option value='$gte'>Grater than or equal</Option>
              <Option value='$lt'>Less than</Option>
              <Option value='$lte'>Less than or equal</Option>
            </Select>
            <DatePicker
              value={query[field]?.value || ''}
              size='large'
              style={{ width: 'calc( 100% - 100px )' }}
              onChange={(value) => {
                props.handleOnChangeQuery({ value: value || '', field })
              }}
            />
          </Group>
        )
        break
      case 'number':
        filterInput = (
          <Group compact>
            <Select
              defaultValue='$eq'
              size='large'
              style={{ width: '100px' }}
              value={query[field]?.operator || '$eq'}
              onChange={(operator) => {
                props.handleOnChangeQuery({ operator, field })
              }}
            >
              <Option value='$eq'>Equal</Option>
              <Option value='$gt'>Grater than</Option>
              <Option value='$gte'>Grater than or equal</Option>
              <Option value='$lt'>Less than</Option>
              <Option value='$lte'>Less than or equal</Option>
            </Select>
            <Input
              size='large'
              type='number'
              style={{ width: 'calc( 100% - 100px )' }}
              placeholder={name}
              value={query[field]?.value}
              onChange={(e) => {
                const { value } = e.target
                props.handleOnChangeQuery({ value, field })
              }}
            />
          </Group>
        )
        break
      case 'enum':
        filterInput = (
          <Select size='large' placeholder={name} className={'br-5px'}>
            {item.enum.map((enumItem, key) => (
              <Option value={enumItem.value} key={key}>
                {enumItem.key}
              </Option>
            ))}
          </Select>
        )
        break
      default:
        filterInput = (
          <Group compact>
            <Select
              defaultValue='$eq'
              size='large'
              style={{ width: '100px' }}
              value={query[field]?.operator || '$eq'}
              onChange={(operator) => {
                props.handleOnChangeQuery({ operator, field })
              }}
            >
              <Option value='$eq'>Equal</Option>
              <Option value='$regex'>Contains</Option>
              <Option value='$not/$regex'>Not contains</Option>
            </Select>
            <Input
              size='large'
              placeholder={name}
              value={query[field]?.value}
              onChange={(e) => {
                const { value } = e.target
                props.handleOnChangeQuery({ value, field })
              }}
            />
          </Group>
        )
        break
    }

    return (
      <Col md={12} lg={6} className='px-2 mb-2' key={field}>
        {filterInput}
      </Col>
    )
  }
  return <>{lsFilterField.map((item) => getFilterInput(item))}</>
}

export default FilterInput
