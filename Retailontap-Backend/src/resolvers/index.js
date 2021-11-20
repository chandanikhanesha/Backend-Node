import { mergeResolvers } from "merge-graphql-schemas";

import userRegister from "./userRegister";
import userVerifyCode from "./userVerifyCode";
import userLogIn from "./userLogIn";
import userForgotPassword from "./userForgotPassword";
import userResetPassword from "./userResetPassword";
import userInvite from "./userInvite";
import resendConfirmationCode from "./resendConfirmationCode";
import userLogInByGoogleAuth from "./userLogInByGoogleAuth";
import sendEmailAuthCode from "./sendEmailAuthCode";
import verifyEmailAuthCode from "./verifyEmailAuthCode";
import sendEnquiry from "./sendEnquiry";

//TODO only for teting for frontend developer
import deleteUserForTest from "./user/deleteUserForTest";

//User
import getAuthUser from "./user/getAuthUser";
import inviteInternalUser from "./user/inviteInternalUser";
import completeProfile from "./user/completeProfile";
import connectExternalUsers from "./user/connectExternalUsers";
import acceptExternalInvite from "./user/acceptExternalInvite";
import enableMFA from "./user/enableMFA";
import validateMFA from "./user/validateMFA";
import disableMFA from "./user/disableMFA";
import checkMFAEnabled from "./user/checkMFAEnabled";
import sendEmailToEnableAuth from "./user/sendEmailToEnableAuth";
import enableEmailAuth from "./user/enableEmailAuth";
import checkAuthEnabled from "./user/checkAuthEnabled";
import getDefaultAuthMethod from "./user/getDefaultAuthMethod";
import disableEmailAuth from "./user/disableEmailAuth";
import updateProfile from "./user/updateProfile";
import changeProfileImage from "./user/changeProfileImage";
import changePassword from "./user/changePassword";
import userLogOut from "./user/auth/userLogOut";
import refreshToken from "./user/auth/refreshToken";
import updateTimeAndLocale from "./user/updateTimeAndLocale";
import getInviteList from "./user/getInviteList";
import getNotificationCount from "./user/getNotificationCount";
import updateNotificationStatus from "./user/updateNotificationStatus";
import getNotificationList from "./user/getNotificationList";

//Internal User
import checkIdentity from "./user/internal/checkIdentity";
import getInternalUser from "./user/internal/getInternalUser";
import updateInternalUser from "./user/internal/updateInternalUser";
import checkAvailableLicense from "./user/internal/checkAvailableLicense";
import deleteInternalUser from "./user/internal/deleteInternalUser";
import resendInviteToInternalUser from "./user/internal/resendInviteToInternalUser";
import searchInternalUser from "./user/internal/searchInternalUser";

//External User
import resendInviteToExternalUser from "./user/external/resendInviteToExternalUser";
import disconnectExternalUser from "./user/external/disconnectExternalUser";
import searchExternalUser from "./user/external/searchExternalUser";
import getExternalUser from "./user/external/getExternalUser";
import addHashtagsToExternalUser from "./user/external/addHashtagsToExternalUser";
import getExternalUserProject from "./user/external/getExternalUserProject";
import getExternalUserSample from "./user/external/getExternalUserSample";
import getExternalUserProjectCounts from "./user/external/getExternalUserProjectCounts";

//Organisation
import getUserOrganisation from "./organisation/getUserOrganisation";
import updateOrganisation from "./organisation/updateOrganisation";
import getInternalUsers from "./organisation/getInternalUsers";
import addAdministrator from "./organisation/addAdministrator";
import searchForAdmin from "./organisation/searchForAdmin";
import searchForOwner from "./organisation/searchForOwner";
import changeOwner from "./organisation/changeOwner";
import deleteOrganisation from "./organisation/deleteOrganisation";
import getReasons from "./organisation/getReasons";
import removeAdministrator from "./organisation/removeAdministrator";
import connectExternalOrganisation from "./organisation/connectExternalOrganisation";
import getExternalUsers from "./organisation/getExternalUsers";
import getAllExternalUsersByUserId from "./organisation/getAllExternalUsersByUserId";
import getExternalOrganisations from "./organisation/getExternalOrganisations";
import getOrganisationAdministrators from "./organisation/getOrganisationAdministrators";
import getOrganisationOwner from "./organisation/getOrganisationOwner";

//External Organisation
import getExternalOrganisation from "./organisation/external/getExternalOrganisation";
import resendInviteToExternalOrganisation from "./organisation/external/resendInviteToExternalOrganisation";
import getExternalOrganisationMembers from "./organisation/external/getExternalOrganisationMembers";
import getExternalOrganisationMember from "./organisation/external/getExternalOrganisationMember";
import disconnectExternalOrganisation from "./organisation/external/disconnectExternalOrganisation";
import searchExternalOrganisations from "./organisation/external/searchExternalOrganisations";
import getSupplierExternalOrganisations from "./organisation/external/getSupplierExternalOrganisations";

// Country
import getCountries from "./country/getCountries";

// TimeZone
import getTimeZones from "./timeZone/getTimeZones";

// Languages
import getLanguages from "./language/getLanguages";

// Role
import getRoles from "./role/getRoles";

// Seed
import seed from "./seed/seed";

// License
import getLicenses from "./license/getLicenses";

//Biling
import createSubscription from "./billing/createSubscription";
import updateSubscription from "./billing/updateSubscription";
import getInvoices from "./billing/getInvoices";
import getPayments from "./billing/getPayments";
import retrieveUpcomingInvoice from "./billing/retrieveUpcomingInvoice";
import retrieveSubscription from "./billing/retrieveSubscription";
import getUserSubscriptions from "./billing/getUserSubscriptions";
import getPaymentMethods from "./billing/getPaymentMethods";
import retrievePaymentMethod from "./billing/retrievePaymentMethod";
import changeDefaultPaymentMethod from "./billing/changeDefaultPaymentMethod";
import retrieveInvoice from "./billing/retrieveInvoice";
import cancelSubscription from "./billing/cancelSubscription";

//Team
import createTeam from "./team/createTeam";
import deleteTeam from "./team/deleteTeam";
import getTeamsList from "./team/getTeamsList";
import getTeam from "./team/getTeam";
import searchTeam from "./team/searchTeam";
import addTeamMember from "./team/addTeamMember";
import updateTeam from "./team/updateTeam";
import addTeamAdministrator from "./team/addTeamAdministrator";
import updateTeamAdministrator from "./team/updateTeamAdministrator";
import updateTeamMember from "./team/updateTeamMember";

//Project
import createProject from "./project/createProject";
import projectConversations from "./project/projectConversations";
import getProjectsList from "./project/getProjectsList";
import updateProject from "./project/updateProject";
import getProject from "./project/getProject";
import addFilesToProject from "./project/addFilesToProject";
import getProjectFiles from "./project/getProjectFiles";
import addMySpaceFileToProject from "./project/addMySpaceFileToProject";
import filterProject from "./project/filterProject";
import deleteProject from "./project/deleteProject";
import updateProjectStatus from "./project/updateProjectStatus";

//Material
import getMaterialsList from "./material/getMaterialsList";

//Group
import createGroup from "./group/createGroup";
import getGroupsList from "./group/getGroupsList";
import assignUsersToGroup from "./group/assignUsersToGroup";
import renameGroup from "./group/renameGroup";
import deleteGroup from "./group/deleteGroup";
import deleteUsersFromGroup from "./group/deleteUsersFromGroup";
import leaveTheGroup from "./group/leaveTheGroup";

//Hashtag
import getHashtagsList from "./hashtag/getHashtagsList";
import getSupplierProductsHashtags from "./hashtag/getSupplierProductsHashtags";
import getQuotationProjectsHashtags from "./hashtag/getQuotationProjectsHashtags";
import getOrderProductsHashtags from "./hashtag/getOrderProductsHashtags";

//Conversation
import createConversation from "./conversation/createConversation";
import getConversationsList from "./conversation/getConversationsList";
import getConversation from "./conversation/getConversation";
import inviteToConversation from "./conversation/inviteToConversation";
import convertToProject from "./conversation/convertToProject";
import deleteConversation from "./conversation/deleteConversation";

//Product
import createProduct from "./product/createProduct";
import getProductsList from "./product/getProductsList";
import updateProduct from "./product/updateProduct";
import getProduct from "./product/getProduct";
import getQuotationsItemsByProjectId from "./product/getProductItemsByProjectId";
import filterSupplierExternalOrganisationProducts from "./product/filterSupplierExternalOrganisationProducts";
import addView from "./product/addView";

//My Space
import createFolder from "./mySpace/createFolder";
import createFile from "./mySpace/createFile";
import getFolderFileLists from "./mySpace/getFolderFileLists";
import renameFolderFile from "./mySpace/renameFolderFile";
import deleteFolderFile from "./mySpace/deleteFolderFile";
import copyFolderFile from "./mySpace/copyFolderFile";
import moveFolderFile from "./mySpace/moveFolderFile";

//Notification
import updateNotification from "./notification/updateNotification";
import getNotifications from "./notification/getNotifications";
import sendNotification from "./notification/sendNotification";

//Report
import createReport from "./report/createReport";
import getTemplateList from "./report/getTemplateList";
import createReportPage from "./report/createReportPage";
import saveReportInMySpace from "./report/saveReportInMySpace";
import reports from "./report/getReportList";
import report from "./report/getReport";
import updateReport from "./report/updateReport";
import deleteReport from "./report/deleteReport";
import deleteReportPage from "./report/deleteReportPage";
import createReportWithPage from "./report/createReportWithPage";

//ReportType
import getReportTypes from "./reportType/getReportTypes";

//Sample
import createSample from "./sample/createSample";
import getSamplesList from "./sample/getSamplesList";
import getSample from "./sample/getSample";
import removeSample from "./sample/removeSample";
import getSamplesOrganisationsList from "./sample/getSamplesOrganisationsList";
import filterSample from "./sample/filterSample";
import updateSample from "./sample/updateSample";
import getInternalUserSamplesList from "./sample/getInternalUserSamplesList";

//Quotation
import createQuotation from "./quotation/createQuotation";
import updateQuotation from "./quotation/updateQuotation";
import getQuotationsListByProjectId from "./quotation/getQuotationsItemsByProjectId";
import getQuotationsList from "./quotation/getQuotationsList";
import getQuotation from "./quotation/getQuotation";
import getQuotationOrganisationList from "./quotation/getQuotationOrganisationList";
import filterQuotation from "./quotation/filterQuotation";

//Order
import createOrder from "./order/createOrder";
import updateOrder from "./order/updateOrder";
import getOrdersList from "./order/getOrdersList";
import getOrderOrganisationList from "./order/getOrderOrganisationList";
import getInternalUserOrdersList from "./order/getInternalUserOrdersList";

//Report Dashboard
import getReportDashboardInfo from "./reportDashboard/getReportDashboardInfo";
import filterOrdersDiagrams from "./reportDashboard/filterOrdersDiagrams";
import filterOrdersProductsCounts from "./reportDashboard/filterOrdersProductsCounts";
import filterOrdersProducts from "./reportDashboard/filterOrdersProducts";
import filterShowRoom from "./reportDashboard/filterShowRoom";
import filterShowRoomByUserId from "./reportDashboard/filterShowroomByUserId";

//Certification
import addCertification from "./certification/addCertification";
import getCertificationList from "./certification/getCertificationList";
import getCertification from "./certification/getCertification";
import updateCertification from "./certification/updateCertification";
import deleteCertification from "./certification/deleteCertification";
import updateCertificationStatus from "./certification/updateCertificationStatus";

//Feedback
import saveFeedback from "./feedback/saveFeedback";
import getFeedbackTypeList from "./feedback/getFeedbackTypeList";

//Costing Sheets
import getCostingSheet from "./costingSheet/getCostingSheet";
import createCostingSheet from "./costingSheet/createCostingSheet";

//QuickQuotation
import createQuickQuotation from "./quick_quotation/quickQuotation";

export default mergeResolvers([
  userRegister,
  userVerifyCode,
  userLogIn,
  userForgotPassword,
  userResetPassword,
  resendConfirmationCode,
  userInvite,
  userLogOut,
  userLogInByGoogleAuth,
  sendEmailAuthCode,
  verifyEmailAuthCode,
  refreshToken,
  sendEnquiry,

  //TODO only for teting for frontend developer
  deleteUserForTest,

  //User
  getAuthUser,
  inviteInternalUser,
  completeProfile,
  connectExternalUsers,
  acceptExternalInvite,
  updateProfile,
  changeProfileImage,
  changePassword,
  updateTimeAndLocale,
  enableMFA,
  validateMFA,
  disableMFA,
  checkMFAEnabled,
  sendEmailToEnableAuth,
  enableEmailAuth,
  checkAuthEnabled,
  getDefaultAuthMethod,
  disableEmailAuth,
  getInviteList,
  getNotificationCount,
  updateNotificationStatus,
  getNotificationList,

  //Internal User
  checkIdentity,
  getInternalUser,
  updateInternalUser,
  checkAvailableLicense,
  deleteInternalUser,
  resendInviteToInternalUser,
  searchInternalUser,

  //External User
  resendInviteToExternalUser,
  disconnectExternalUser,
  searchExternalUser,
  getExternalUser,
  addHashtagsToExternalUser,
  getExternalUserProject,
  getExternalUserProjectCounts,

  //Organisation
  getUserOrganisation,
  updateOrganisation,
  getInternalUsers,
  addAdministrator,
  searchForAdmin,
  searchForOwner,
  changeOwner,
  deleteOrganisation,
  getReasons,
  removeAdministrator,
  connectExternalOrganisation,
  getExternalUsers,
  getAllExternalUsersByUserId,
  getExternalOrganisations,
  getOrganisationAdministrators,
  getOrganisationOwner,

  //External Organisation
  getExternalOrganisation,
  resendInviteToExternalOrganisation,
  getExternalOrganisationMembers,
  getExternalOrganisationMember,
  disconnectExternalOrganisation,
  searchExternalOrganisations,
  getSupplierExternalOrganisations,
  getExternalUserSample,

  //Country
  getCountries,

  //TimeZone
  getTimeZones,

  //Languages
  getLanguages,

  //Role
  getRoles,

  //Seed
  seed,

  //License
  getLicenses,

  //Billing
  createSubscription,
  updateSubscription,
  getInvoices,
  getPayments,
  retrieveUpcomingInvoice,
  retrieveSubscription,
  getUserSubscriptions,
  getPaymentMethods,
  retrievePaymentMethod,
  changeDefaultPaymentMethod,
  retrieveInvoice,
  cancelSubscription,

  //Team
  createTeam,
  deleteTeam,
  getTeamsList,
  getTeam,
  searchTeam,
  addTeamMember,
  updateTeam,
  addTeamAdministrator,
  updateTeamAdministrator,
  updateTeamMember,

  //Project
  createProject,
  projectConversations,
  getProjectsList,
  updateProject,
  getProject,
  addFilesToProject,
  getProjectFiles,
  addMySpaceFileToProject,
  filterProject,
  deleteProject,
  updateProjectStatus,

  //Material
  getMaterialsList,

  //Group
  createGroup,
  getGroupsList,
  assignUsersToGroup,
  renameGroup,
  deleteGroup,
  deleteUsersFromGroup,
  leaveTheGroup,

  //Hashtag
  getHashtagsList,
  getSupplierProductsHashtags,
  getQuotationProjectsHashtags,
  getOrderProductsHashtags,

  //Conversation
  createConversation,
  getConversationsList,
  getConversation,
  inviteToConversation,
  convertToProject,
  deleteConversation,

  //Product
  createProduct,
  getProductsList,
  updateProduct,
  getProduct,
  getQuotationsItemsByProjectId,
  filterSupplierExternalOrganisationProducts,
  addView,

  //My Space
  createFolder,
  createFile,
  getFolderFileLists,
  renameFolderFile,
  deleteFolderFile,
  copyFolderFile,
  moveFolderFile,

  //Notification
  updateNotification,
  getNotifications,
  sendNotification,

  //Report
  createReport,
  getTemplateList,
  createReportPage,
  saveReportInMySpace,
  reports,
  report,
  updateReport,
  deleteReport,
  deleteReportPage,
  createReportWithPage,

  //ReportType
  getReportTypes,

  //Sample
  createSample,
  getSamplesList,
  getSample,
  removeSample,
  getSamplesOrganisationsList,
  filterSample,
  updateSample,
  getInternalUserSamplesList,

  //Quotation
  createQuotation,
  getQuotationsListByProjectId,
  updateQuotation,
  getQuotationsList,
  getQuotation,
  getQuotationOrganisationList,
  filterQuotation,

  //Order
  createOrder,
  updateOrder,
  getOrdersList,
  getOrderOrganisationList,
  getInternalUserOrdersList,

  //Report Dashboard
  getReportDashboardInfo,
  filterOrdersDiagrams,
  filterOrdersProductsCounts,
  filterOrdersProducts,
  filterShowRoom,
  filterShowRoomByUserId,

  //Certification
  addCertification,
  getCertificationList,
  getCertification,
  updateCertification,
  deleteCertification,
  updateCertificationStatus,

  //Feedback
  getFeedbackTypeList,
  saveFeedback,

  //CostingSheet
  getCostingSheet,
  createCostingSheet,

  //QuickQuotation
  createQuickQuotation,
]);
