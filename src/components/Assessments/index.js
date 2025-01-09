import React, { useState } from 'react'
import { getAllAssessment } from '../../services/assessment.services';
import Table from '../Table';
import moment from 'moment';
import Spinner from '../Spinner';

const Assessments = () => {
  const [assessment,setAssessments] = useState([]);
  const [loading,setLoading] = useState(false);

  const getAssessments = async () => {
    try{
      setLoading(true);
      const resp = await getAllAssessment()
      if(resp.data){
        setAssessments(resp.data.filter((assessment) => assessment.status.toLowerCase() === 'opened'));
        setLoading(false);
      }
    }catch(e){
      setLoading(false);
      console.error(e);
    }
  }

  const columns =[
    {
      heading:'Name',
      accessor:'name'
    },
    {
      heading:'Owner',
      accessor:'owner',
      Cell:({row})=><div>
        <p>{row.owner.first_name} {row.owner.last_name}</p>
      </div>
    },
    {
      heading:'Status',
      accessor:'status',
    },
    {
      heading:'Start at',
      accessor:'start_at',
      Cell:({row}) => <p>{moment(row.start_at).format('ll')}</p>
    },
    {
      heading:'End at',
      accessor:'end_at',
      Cell:({row}) => <p>{moment(row.end_at).format('ll')}</p>
    },
    {
      heading:'link',
      accessor:'end_at',
      Cell:({row}) =><div>
        <a href={`https://candidate.mereos.eu/registration/${row.id}?first_name=John&last_name=Doe&email=john.doe@example.com`} rel="noopener noreferrer" target='_blank' >Assessment Link</a>
      </div>
    },
  ]
  return (
    <div className='assessment-container'>
    <h2>Welcome!</h2>
    <button onClick={getAssessments}>Show Assessments</button>
    {
      loading && <Spinner style={{bottom:'-133px'}} />
    }
    {
    assessment?.length > 0 && 
      <div className='table-container'>
        <Table 
        column={columns}
        data={assessment}
        onSortedList={()=>console.log('')}
        totalRecords={assessment?.length}
       />
      </div>
    }
  </div>
  )
}

export default Assessments