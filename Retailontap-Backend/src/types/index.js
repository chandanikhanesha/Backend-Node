import { mergeTypes } from "merge-graphql-schemas";

import Role from "./models/role.graphql";
import User from "./models/user.graphql";
import Organisation from "./models/organisation.graphql";
import Logo from "./models/logo.graphql";
import Tier from "./models/tier.graphql";
import Price from "./models/price.graphql";
import License from "./models/license.graphql";
import Invoice from "./models/invoice.graphql";
import Payment from "./models/payment.graphql";
import Material from "./models/material.graphql";
import Hashtag from "./models/hashtag.graphql";

import shared from "./shared.graphql";
import response from "./shared/response.graphql";
import userRegister from "./userRegister.graphql";
import userVerifyCode from "./userVerifyCode.graphql";
import userLogIn from "./userLogIn.graphql";
import userForgotPassword from "./userForgotPassword.graphql";
import userResetPassword from "./userResetPassword.graphql";
import userInvite from "./userInvite.graphql";
import resendConfirmationCode from "./resendConfirmationCode.graphql";
import userLogInByGoogleAuth from "./userLogInByGoogleAuth.graphql";
import sendEmailAuthCode from "./sendEmailAuthCode.graphql";
import verifyEmailAuthCode from "./verifyEmailAuthCode.graphql";
import sendEnquiry from "./sendEnquiry.graphql";
import userLogOut from "./user/auth/userLogOut.graphql";
import refreshToken from "./user/auth/refreshToken.graphql";

//User
import getAuthUser from "./user/getAuthUser.graphql";
import inviteInternalUser from "./user/inviteInternalUser.graphql";
import completeProfile from "./user/completeProfile.graphql";
import connectExternalUsers from "./user/connectExternalUsers.graphql";
import acceptExternalInvite from "./user/acceptExternalInvite.graphql";
import updateProfile from "./user/updateProfile.graphql";
import changeProfileImage from "./user/changeProfileImage.graphql";
import changePassword from "./user/changePassword.graphql";
import updateTimeAndLocale from "./user/updateTimeAndLocale.graphql";
import getInviteList from "./user/getInviteList.graphql";
import enableMFA from "./user/enableMFA.graphql";
import validateMFA from "./user/validateMFA.graphql";
import disableMFA from "./user/disableMFA.graphql";
import checkMFAEnabled from "./user/checkMFAEnabled.graphql";
import sendEmailToEnableAuth from "./user/sendEmailToEnableAuth.graphql";
import enableEmailAuth from "./user/enableEmailAuth.graphql";
import checkAuthEnabled from "./user/checkAuthEnabled.graphql";
import getDefaultAuthMethod from "./user/getDefaultAuthMethod.graphql";
import disableEmailAuth from "./user/disableEmailAuth.graphql";
import getNotificationCount from "./user/getNotificationCount.graphql";
import updateNotificationStatus from "./user/updateNotificationStatus.graphql";
import getNotificationList from "./user/getNotificationList.graphql";

//Internal User
import checkIdentity from "./user/internal/checkIdentity.graphql";
import getInternalUser from "./user/internal/getInternalUser.graphql";
import updateInternalUser from "./user/internal/updateInternalUser.graphql";
import checkAvailableLicense from "./user/internal/checkAvailableLicense.graphql";
import deleteInternalUser from "./user/internal/deleteInternalUser.graphql";
import resendInviteToInternalUser from "./user/internal/resendInviteToInternalUser.graphql";
import searchInternalUser from "./user/internal/searchInternalUser.graphql";

//External User
import resendInviteToExternalUser from "./user/external/resendInviteToExternalUser.graphql";
import disconnectExternalUser from "./user/external/disconnectExternalUser.graphql";
import searchExternalUser from "./user/external/searchExternalUser.graphql";
import getExternalUser from "./user/external/getExternalUser.graphql";
import addHashtagsToExternalUser from "./user/external/addHashtagsToExternalUser.graphql";
import getExternalUserProject from "./user/external/getExternalUserProject.graphql";
import getExternalUserSample from "./user/external/getExternalUserSample.graphql";
import getExternalUserProjectCounts from "./user/external/getExternalUserProjectCounts.graphql";

//TODO only for teting for frontend developer
import deleteUserForTest from "./user/deleteUserForTest.graphql";

//Organisation
import getUserOrganisation from "./organisation/getUserOrganisation.graphql";
import updateOrganisation from "./organisation/updateOrganisation.graphql";
import getInternalUsers from "./organisation/getInternalUsers.graphql";
import addAdministrator from "./organisation/addAdministrator.graphql";
import searchForAdmin from "./organisation/searchForAdmin.graphql";
import searchForOwner from "./organisation/searchForOwner.graphql";
import changeOwner from "./organisation/changeOwner.graphql";
import deleteOrganisation from "./organisation/deleteOrganisation.graphql";
import getReasons from "./organisation/getReasons.graphql";
import removeAdministrator from "./organisation/removeAdministrator.graphql";
import connectExternalOrganisation from "./organisation/connectExternalOrganisation.graphql";
import getExternalUsers from "./organisation/getExternalUsers.graphql";
import getAllExternalUsersByUserId from "./organisation/getAllExternalUsersByUserId.graphql";
import getExternalOrganisations from "./organisation/getExternalOrganisations.graphql";
import getOrganisationAdministrators from "./organisation/getOrganisationAdministrators.graphql";
import getOrganisationOwner from "./organisation/getOrganisationOwner.graphql";

//External Organisation
import getExternalOrganisation from "./organisation/external/getExternalOrganisation.graphql";
import resendInviteToExternalOrganisation from "./organisation/external/resendInviteToExternalOrganisation.graphql";
import getExternalOrganisationMembers from "./organisation/external/getExternalOrganisationMembers.graphql";
import getExternalOrganisationMember from "./organisation/external/getExternalOrganisationMember.graphql";
import disconnectExternalOrganisation from "./organisation/external/disconnectExternalOrganisation.graphql";
import searchExternalOrganisations from "./organisation/external/searchExternalOrganisations.graphql";
import getSupplierExternalOrganisations from "./organisation/external/getSupplierExternalOrganisations.graphql";

// Country
import getCountries from "./country/getCountries.graphql";

// TimeZone
import getTimeZones from "./timeZone/getTimeZones.graphql";

// Language
import getLanguages from "./language/getLanguages.graphql";

// Role
import getRoles from "./role/getRoles.graphql";

// Seed
import seed from "./seed/seed.graphql";

// License
import getLicenses from "./license/getLicenses.graphql";

//Billing
import createSubscription from "./billing/createSubscription.graphql";
import updateSubscription from "./billing/updateSubscription.graphql";
import getInvoices from "./billing/getInvoices.graphql";
import getPayments from "./billing/getPayments.graphql";
import retrieveInvoice from "./billing/retrieveInvoice.graphql";
import retrieveUpcomingInvoice from "./billing/retrieveUpcomingInvoice.graphql";
import retrieveSubscription from "./billing/retrieveSubscription.graphql";
import getUserSubscriptions from "./billing/getUserSubscriptions.graphql";
import getPaymentMethods from "./billing/getPaymentMethods.graphql";
import retrievePaymentMethod from "./billing/retrievePaymentMethod.graphql";
import changeDefaultPaymentMethod from "./billing/changeDefaultPaymentMethod.graphql";
import cancelSubscription from "./billing/cancelSubscription.graphql";

//Team
import createTeam from "./team/createTeam.graphql";
import deleteTeam from "./team/deleteTeam.graphql";
import getTeamsList from "./team/getTeamsList.graphql";
import getTeam from "./team/getTeam.graphql";
import searchTeam from "./team/searchTeam.graphql";
import addTeamMember from "./team/addTeamMember.graphql";
import updateTeam from "./team/updateTeam.graphql";
import addTeamAdministrator from "./team/addTeamAdministrator.graphql";
import updateTeamMember from "./team/updateTeamMember.graphql";
import updateTeamAdministrator from "./team/updateTeamAdministrator.graphql";

//Project
import createProject from "./project/createProject.graphql";
import projectConversations from "./project/projectConversations.graphql";
import getProjectsList from "./project/getProjectsList.graphql";
import updateProject from "./project/updateProject.graphql";
import getProject from "./project/getProject.graphql";
import addFilesToProject from "./project/addFilesToProject.graphql";
import getProjectFiles from "./project/getProjectFiles.graphql";
import addMySpaceFileToProject from "./project/addMySpaceFileToProject.graphql";
import filterProject from "./project/filterProject.graphql";
import deleteProject from "./project/deleteProject.graphql";
import updateProjectStatus from "./project/updateProjectStatus.graphql";

//Material
import getMaterialsList from "./material/getMaterialsList.graphql";

//Group
import createGroup from "./group/createGroup.graphql";
import getGroupsList from "./group/getGroupsList.graphql";
import assignUsersToGroup from "./group/assignUsersToGroup.graphql";
import renameGroup from "./group/renameGroup.graphql";
import deleteGroup from "./group/deleteGroup.graphql";
import deleteUsersFromGroup from "./group/deleteUsersFromGroup.graphql";
import leaveTheGroup from "./group/leaveTheGroup.graphql";

//Hashtag
import getHashtagsList from "./hashtag/getHashtagsList.graphql";
import getSupplierProductsHashtags from "./hashtag/getSupplierProductsHashtags.graphql";
import getQuotationProjectsHashtags from "./hashtag/getQuotationProjectsHashtags.graphql";
import getOrderProductsHashtags from "./hashtag/getOrderProductsHashtags.graphql";

//Conversation
import createConversation from "./conversation/createConversation.graphql";
import getConversationsList from "./conversation/getConversationsList.graphql";
import getConversation from "./conversation/getConversation.graphql";
import inviteToConversation from "./conversation/inviteToConversation.graphql";
import convertToProject from "./conversation/convertToProject.graphql";
import deleteConversation from "./conversation/deleteConversation.graphql";

//Product
import createProduct from "./product/createProduct.graphql";
import getProductsList from "./product/getProductsList.graphql";
import updateProduct from "./product/updateProduct.graphql";
import getProduct from "./product/getProduct.graphql";
import getQuotationsItemsByProjectId from "./product/getProductItemsByProjectId.graphql";
import filterSupplierExternalOrganisationProducts from "./product/filterSupplierExternalOrganisationProducts.graphql";
import addView from "./product/addView.graphql";

//My Space
import createFolder from "./mySpace/createFolder.graphql";
import createFile from "./mySpace/createFile.graphql";
import getFolderFileLists from "./mySpace/getFolderFileLists.graphql";
import renameFolderFile from "./mySpace/renameFolderFile.graphql";
import deleteFolderFile from "./mySpace/deleteFolderFile.graphql";
import copyFolderFile from "./mySpace/copyFolderFile.graphql";
import moveFolderFile from "./mySpace/moveFolderFile.graphql";

//Notification
import updateNotification from "./notification/updateNotification.graphql";
import getNotifications from "./notification/getNotifications.graphql";
import sendNotification from "./notification/sendNotification.graphql";

//Report
import createReport from "./report/createReport.graphql";
import getTemplateList from "./report/getTemplateList.graphql";
import createReportPage from "./report/createReportPage.graphql";
import saveReportInMySpace from "./report/saveReportInMySpace.graphql";
import reports from "./report/getReportList.graphql";
import report from "./report/getReport.graphql";
import updateReport from "./report/updateReport.graphql";
import deleteReport from "./report/deleteReport.graphql";
import deleteReportPage from "./report/deleteReportPage.graphql";
import createReportWithPage from "./report/createReportWithPage.graphql";

//ReportType
import getReportTypes from "./reportType/getReportTypes.graphql";

//Sample
import createSample from "./sample/createSample.graphql";
import getSamplesList from "./sample/getSamplesList.graphql";
import getSample from "./sample/getSample.graphql";
import removeSample from "./sample/removeSample.graphql";
import getSamplesOrganisationsList from "./sample/getSamplesOrganisationsList.graphql";
import filterSample from "./sample/filterSample.graphql";
import updateSample from "./sample/updateSample.graphql";
import getInternalUserSamplesList from "./sample/getInternalUserSamplesList.graphql";

//Quotation
import createQuotation from "./quotation/createQuotation.graphql";
import updateQuotation from "./quotation/updateQuotation.graphql";
import getQuotationsListByProjectId from "./quotation/getQuotationsItemsByProjectId.graphql";
import getQuotationsList from "./quotation/getQuotationsList.graphql";
import getQuotation from "./quotation/getQuotation.graphql";
import filterQuotation from "./quotation/filterQuotation.graphql";
import getQuotationsOrganisationsList from "./quotation/getQuotationsOrganisationsList.graphql";

//Order
import createOrder from "./order/createOrder.graphql";
import updateOrder from "./order/updateOrder.graphql";
import getOrdersList from "./order/getOrdersList.graphql";
import getOrdersOrganisationsList from "./order/getOrdersOrganisationsList.graphql";
import getInternalUserOrdersList from "./order/getInternalUserOrdersList.graphql";

//Report Dashboard
import getReportDashboardInfo from "./reportDashboard/getReportDashboardInfo.graphql";
import filterOrdersDiagrams from "./reportDashboard/filterOrdersDiagrams.graphql";
import filterOrdersProductsCounts from "./reportDashboard/filterOrdersProductsCounts.graphql";
import filterOrdersProducts from "./reportDashboard/filterOrdersProducts.graphql";
import filterShowRoom from "./reportDashboard/filterShowRoom.graphql";
import filterShowroomByUserId from "./reportDashboard/filterShowroomByUserId.graphql";

// Certification
import addCertification from "./certification/addCertification.graphql";
import getCertificationList from "./certification/getCertificationList.graphql";
import getCertification from "./certification/getCertification.graphql";
import updateCertification from "./certification/updateCertification.graphql";
import deleteCertification from "./certification/deleteCertification.graphql";
import updateCertificationStatus from "./certification/updateCertificationStatus.graphql";

// Feedback
import saveFeedback from "./feedback/saveFeedback.graphql";
import getFeedbackTypeList from "./feedback/getFeedbackTypeList.graphql";

//CostingSheet
import getCostingSheet from "./costingSheet/getCostingSheet.graphql";
import createCostingSheet from "./costingSheet/createCostingSheet.graphql";
//QuickQuotation
import createQuickQuotation from "./quickQuotation/createQuickQuotation.graphql";

export default mergeTypes(
  [
    //Models
    Role,
    User,
    Organisation,
    Logo,
    Tier,
    Price,
    License,
    Invoice,
    Payment,
    Material,
    Hashtag,

    shared,
    response,
    userRegister,
    userVerifyCode,
    userLogIn,
    userForgotPassword,
    userResetPassword,
    userInvite,
    resendConfirmationCode,
    userLogInByGoogleAuth,
    sendEmailAuthCode,
    verifyEmailAuthCode,
    sendEnquiry,
    userLogOut,
    refreshToken,

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
    getExternalUserSample,
    getExternalUserProjectCounts,

    //TODO only for teting for frontend developer
    deleteUserForTest,

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
    updateTeamMember,
    updateTeamAdministrator,

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
    filterQuotation,
    getQuotationsOrganisationsList,

    //Order
    createOrder,
    updateOrder,
    getOrdersList,
    getOrdersOrganisationsList,
    getInternalUserOrdersList,

    //Report Dashboard
    getReportDashboardInfo,
    filterOrdersDiagrams,
    filterOrdersProductsCounts,
    filterOrdersProducts,
    filterShowRoom,
    filterShowroomByUserId,

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
  ],
  { all: true }
);
