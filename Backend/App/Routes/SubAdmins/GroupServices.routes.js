
"use strict"

const router = require("express").Router()
const { verifyToken } = require('../../Middlewares/autt.middleware')

const { Addgroupservice,getAllSubgroupServices,GetAllServicesGiven ,GetAllServices, GetAllCatagory, allServicesSymboll, GetServicesByGroupId1, getServiceByCatagory, getAllgroupServices, GetAllServicesName, DELETEGROUPSERVICES, GetAllServicesUserNAme, GetServicesByGroupId, Editgroupservice,GetAllServicesGivengroupId } = require('../../Controllers/SubAdmins/GroupServices/servicegroup.controller')


router.post('/groupservice/add', Addgroupservice)
router.post('/groupservice/edit', Editgroupservice)

router.post('/AllService/get', GetAllServices)
router.post('/symboll/all', allServicesSymboll)
router.post('/allCatagory', GetAllCatagory)
router.post('/ServiceByCatagory', getServiceByCatagory)
router.post('/groupservices/getall', getAllgroupServices)
router.post('/servicesName/getall', GetAllServicesName)
router.post('/servicesGiven/getall', GetAllServicesGiven)
router.post('/sub/groupservices/getall', getAllSubgroupServices)
router.post('/services/username/getall', GetAllServicesUserNAme)
router.post('/services/bygroupid/get', GetServicesByGroupId)
router.post('/services/bygroupid1/get', GetServicesByGroupId1)
router.post('/groupServices/delete', DELETEGROUPSERVICES)
 

router.post('/groupservice/name', GetAllServicesGivengroupId)



module.exports = router;


