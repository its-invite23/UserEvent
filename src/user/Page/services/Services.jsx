import React, { useEffect, useState } from 'react'
import UserLayout from "../../Layout/UserLayout"
import ServicesProvider from './ServicesProvider'
import Servicesrecap from './Servicesrecap'
import { useParams } from 'react-router-dom'
import Listing from '../../../Api/Listing'
import { useSelector } from 'react-redux'
import ServicesProviderPackage from './ServiceProviderPackage'
export default function Services() {
  const updatedFormData = useSelector((state) => state.form.updatedFormData);
  const { id } = useParams()
  const [data, setData] = useState("");
  const fetchApi = async () => {
    try {
      const main = new Listing();
      const response = await main.getServices({ Id: id });
      setData(response?.data?.data)
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    if (id) {
      fetchApi(id);
    }
  }, [id]);
  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">

      <UserLayout>
      {id ?
      <>
        <ServicesProviderPackage id={id} data={data}/>
      </>
        :
        <>
        <Servicesrecap data={data} formData={updatedFormData} id={id} />
        <ServicesProvider data={data}/>
        </>
        }
      </UserLayout>
    </div>
  )
}
