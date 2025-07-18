



import { Button, Checkbox, CircularProgress, Divider, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import GradientButton from '../../ReuseComponent/ReuseComponent'

function princingHeading({ princingHeading, setPrincingHeading, loading, submitHandler }) {

  const onchangeFeature = (e) => {
    const { name, value } = e.target
    setPrincingHeading((prev) => ({ ...prev, [name]: value }))
  }

  console.log(princingHeading)

  return (
    <Fragment>
      <div className='main flex justify-center items-center h-full w-full'>
        <form className='form border border-slate-500/20 w-[600px] p-5 flex flex-col gap-4 rounded-md'>
          <h1 className='text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'>
            Princing Section Headings
          </h1>
          <Divider />

          <TextField
            label="Section Title"
            size="small"
            variant="outlined"
            name="title"
            value={princingHeading.title}
            onChange={onchangeFeature}
            required
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                fontSize: '12px',
                '& input': {
                  fontSize: '14px',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
              '& label': {
                color: 'gray',
                fontSize: '14px',
              },
              '& label.Mui-focused': {
                color: 'white',
              }
            }}
          />

          <TextField
            label="Section Description"
            size="small"
            variant="outlined"
            name="Descriptions"
            value={princingHeading.Descriptions}
            onChange={onchangeFeature}
            multiline
            rows={4}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                fontSize: '12px',
                '& textarea': {
                  fontSize: '14px',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
              '& label': {
                color: 'gray',
                fontSize: '14px',
              },
              '& label.Mui-focused': {
                color: 'white',
              }
            }}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={princingHeading.item_ShowOnWebsite}
              onChange={(e) => setPrincingHeading((prev) => ({ ...prev, item_ShowOnWebsite: e.target.checked }))}
              sx={{ m: 0, p: 0 }}
              size="small"
            />
            <p className="text-[14px] text-slate-500">
              If you want to show this on the website
            </p>
          </div>

          <div className='flex gap-2 justify-end'>
            <GradientButton
              onClick={() => submitHandler("PrincingHeading")}
              // disabled={loading}
              loading={loading}

            >
              Save Changes
            </GradientButton>


          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default princingHeading
