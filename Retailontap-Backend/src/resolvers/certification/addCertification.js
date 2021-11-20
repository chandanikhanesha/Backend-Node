import { OrganisationCertification, Organisation } from '../../../models';
import { response, generateRandomString, validateForm } from '../../utils/functions';
import s3FileUpload from '../../utils/s3FileUpload';

export default {
    Mutation: {
        addCertification: async (parent, args, context) => {
            let errors = {};
            let isValid = false;
            let uploadedFile = null;

            const validationRule = {                
                name: 'required|string',
                certificate: 'required|string',
                file_type: 'required|string',                
                expiry_at: 'required|date',
            };

             // validate arguments
            const validation = await validateForm(args, validationRule);

            if (validation.errors) {
                isValid = false;
                errors = validation.errors
            }
            else {
                isValid = true;
            }
           
            if (!isValid) {
                errors = JSON.stringify(errors);
                return response(
                    'add-certification',
                    'Validation failed!',
                    422,
                    errors
                );
            }

            // check organisation existance
            const organisation = await Organisation.findOne({
                where: { id: context.authUser.organisation[0].id },
            });
           
            if (organisation) {
                let currentDate = new Date();
                const fileName = generateRandomString(4)+currentDate.getTime();
                let path = 'certificate/' + context.authUser.organisation[0].id;

                // upload certificate file
                await s3FileUpload(args.certificate, path, args.file_type ,fileName).then(function (res, err) {
                    if (res && res.key) {
                        uploadedFile = res;
                    }
                });

                if (uploadedFile.key !== '' && uploadedFile.key !== null) {
                    // add certificate to DB
                    const certificate = await OrganisationCertification.create({
                        organisation_id: context.authUser.organisation[0].id,
                        name: args.name,
                        file_name: uploadedFile.key,
                        is_active: true,
                        is_deleted: false,
                        expiry_at: args.expiry_at
                    });

                    if (certificate !== null) {
                        return response(
                            'add-certification',
                            'Certificate added successfully',
                            200
                        ); 
                    }
                }
                else {
                    return response(
                        'add-certification',
                        'Unable to upload file!',
                        400
                    );                  
                }
            }
            else {
                return response(
                    'add-certification',
                    'Organisation not found!',
                    400
                ); 
            }          
        },
    },
}
