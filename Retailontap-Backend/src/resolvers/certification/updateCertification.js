import { OrganisationCertification, Organisation } from '../../../models';
import { response, generateRandomString, validateForm } from '../../utils/functions';
import s3FileUpload from '../../utils/s3FileUpload';

export default {
    Mutation: {
        updateCertification: async (parent, args, context) => {
            let errors = {};
            let isValid = false;
            let uploadedFile = null;

            const validationRule = {
                id: 'required|integer',                
                name: 'required|string',
                isFileUploaded: 'required|boolean',
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
                    'update-certification',
                    'Validation failed!',
                    422,
                    errors
                );
            }

            // check certificate existance
            const certificate = await OrganisationCertification.findOne({
                where: { id: args.id, is_deleted:false },
            });

            if (certificate) {
                // check organisation existance
                const organisation = await Organisation.findOne({
                    where: { id: context.authUser.organisation[0].id },
                });

                if (organisation) {
                    if (args.isFileUploaded) {
                        let currentDate = new Date();
                        const fileName = generateRandomString(4) + currentDate.getTime();
                        let path = 'certificate/' + context.authUser.organisation[0].id;

                        // upload certificate file
                        await s3FileUpload(args.certificate, path, args.file_type, fileName).then(function (res, err) {
                            if (res && res.key) {
                                uploadedFile = res;
                            }
                        });

                        if (uploadedFile.key !== '' && uploadedFile.key !== null) {
                            // update certificate to DB
                            const newCertificate = {
                                id: args.id,                                
                                name: args.name,
                                file_name: uploadedFile.key,
                                expiry_at: args.expiry_at
                            }

                            await OrganisationCertification.update(newCertificate, { where: { id: args.id } });

                            return response(
                                'update-certification',
                                'Certificate updated successfully',
                                200
                            );
                        }
                        else {
                            return response(
                                'update-certification',
                                'Unable to upload file!',
                                400
                            );
                        }
                    }
                    else {
                        const newCertificate = {
                            id: args.id,                            
                            name: args.name,                           
                            expiry_at: args.expiry_at
                        }

                        await OrganisationCertification.update(newCertificate, { where: { id: args.id } });

                        return response(
                            'update-certification',
                            'Certificate updated successfully',
                            200
                        );
                    }
                }
                else {
                    return response(
                        'update-certification',
                        'Organisation not found!',
                        400
                    );
                }
            }
            else {
                return response(
                    'update-certification',
                    'Certificate not found!',
                    400
                );
            }
        },
    },
}