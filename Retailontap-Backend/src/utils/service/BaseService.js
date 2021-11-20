const { Op } = require('sequelize');
import {
    Hashtag,
    Colour,
    Colourable,
    Hashtagable,
    Material,
    Materialable,
} from '../../../models';
import { generateRandomString } from '../functions';
import s3Upload from '../s3Upload';
import s3FileUpload from '../s3FileUpload';
import * as ImageService from './ImageService';
import { pluck } from '../functions';

export const associateHashtags = async (
    model,
    hashtags,
    hashtagableType,
    action
) => {
    let existingHashtags = [];
    let newHashtags = [];
    hashtags.map((hashtag) => {
        if (hashtag.id) {
            existingHashtags.push(hashtag.id);
        } else {
            newHashtags.push({ name: hashtag.name });
        }
    });

    const createdHashtags = await Hashtag.bulkCreate(newHashtags, {
        returning: true,
    });

    createdHashtags.map((createdHashtag) => {
        existingHashtags.push(createdHashtag.id);
    });

    let existingHashtagables = await Hashtagable.findAll({
        where: {
            hashtagable_id: model.id,
            hashtagable_type: hashtagableType,
        },
    });

    existingHashtagables = await pluck(existingHashtagables, 'hashtag_id');

    //check hashtag already assigned to this model
    let hashtagsToAssociate = [];
    existingHashtags.map((existingHashtag) => {
        if (!existingHashtagables.includes(existingHashtag)) {
            hashtagsToAssociate.push({
                hashtag_id: existingHashtag,
                hashtagable_id: model.id,
                hashtagable_type: hashtagableType,
            });
        }
    });

    const createdHashtagables = await Hashtagable.bulkCreate(
        hashtagsToAssociate,
        {
            returning: true,
        }
    );

    if (action === 'update') {
        const condition = {
            where: {
                hashtagable_id: model.id,
                hashtagable_type: hashtagableType,
                hashtag_id: { [Op.notIn]: existingHashtags },
            },
        };
        await deleteAssociations(Hashtagable, condition);
    }
};

export const associateColours = async (
    model,
    colours,
    colorableType,
    action
) => {
    let existingColours = [];
    let newColours = [];
    colours.map((colour) => {
        if (colour.id) {
            existingColours.push(colour.id);
        } else {
            newColours.push({ name: colour.name });
        }
    });

    const createdColours = await Colour.bulkCreate(newColours, {
        returning: true,
    });

    createdColours.map((createdColour) => {
        existingColours.push(createdColour.id);
    });

    let existingColourables = await Colourable.findAll({
        where: {
            colourable_id: model.id,
            colourable_type: colorableType,
        },
    });

    existingColourables = await pluck(existingColourables, 'colour_id');

    //check colour already assigned to this model
    let coloursToAssociate = [];
    existingColours.map((existingColour) => {
        if (!existingColourables.includes(existingColour)) {
            coloursToAssociate.push({
                colour_id: existingColour,
                colourable_id: model.id,
                colourable_type: colorableType,
            });
        }
    });

    const createdColourables = await Colourable.bulkCreate(coloursToAssociate, {
        returning: true,
    });
    if (action === 'update') {
        const condition = {
            where: {
                colourable_id: model.id,
                colourable_type: colorableType,
                colour_id: { [Op.notIn]: existingColours },
            },
        };
        await deleteAssociations(Colourable, condition);
    }
};

export const associateMaterials = async (
    model,
    materials,
    materialableType,
    action
) => {
    let existingMaterials = [];
    let newMaterials = [];
    materials.map((material) => {
        if (material.id) {
            existingMaterials.push(material.id);
        } else {
            newMaterials.push({ name: material.name });
        }
    });

    const createdMaterials = await Material.bulkCreate(newMaterials, {
        returning: true,
    });

    createdMaterials.map((createdMaterial) => {
        existingMaterials.push(createdMaterial.id);
    });

    let existingMaterialables = await Materialable.findAll({
        where: {
            materialable_id: model.id,
            materialable_type: materialableType,
        },
    });

    existingMaterialables = await pluck(existingMaterialables, 'material_id');

    //check hashtag already assigned to this model
    let materialsToAssociate = [];
    existingMaterials.map((existingMaterial) => {
        if (!existingMaterialables.includes(existingMaterial)) {
            materialsToAssociate.push({
                material_id: existingMaterial,
                materialable_id: model.id,
                materialable_type: materialableType,
            });
        }
    });

    const createdMaterialables = await Materialable.bulkCreate(
        materialsToAssociate,
        {
            returning: true,
        }
    );

    if (action === 'update') {
        const condition = {
            where: {
                materialable_id: model.id,
                materialable_type: materialableType,
                material_id: { [Op.notIn]: existingMaterials },
            },
        };
        await deleteAssociations(Materialable, condition);
    }
};

export const associateImages = async (item, images, folder, model) => {
    images.map(async (image) => {
        let currentDate = new Date();
        const imageName = generateRandomString(4) + currentDate.getTime();
        let uploadedImage = null;

        const type = image.image.split(';')[0].split('/')[1];

        console.log("*************************");
        console.log("type: " + type);
        console.log("*************************");

        if (type !== "pdf" && type !== "docx" && type !== "txt") {
            await s3Upload(image.image, folder + '/' + item.id, imageName).then(
                function (res) {
                    if (res && res.key) {
                        uploadedImage = res;
                    }
                }
            );
        }
        else {
            await s3FileUpload(image.image, folder + '/' + item.id, type, imageName).then(function (res, err) {
                if (res && res.key) {
                    uploadedImage = res;
                }
            });
        }

        if (uploadedImage && uploadedImage.key) {
            await ImageService.createOrUpdateImage(
                model,
                item.id,
                uploadedImage.key,
                null,
                true
            );
        }
    });
};

export const associateProjectFiles = async (item, images, folder, model) => {
    images.map(async (image) => {
        if (image.isImageBase64) {
            let currentDate = new Date();
            const imageName = generateRandomString(4) + currentDate.getTime();
            let uploadedImage = null;

            const type = image.image.split(';')[0].split('/')[1];

            if (type !== "pdf" && type !== "docx" && type !== "txt") {
                await s3Upload(image.image, folder + '/' + item.id, imageName).then(
                    function (res) {
                        if (res && res.key) {
                            uploadedImage = res;
                        }
                    }
                );
            }
            else {
                await s3FileUpload(image.image, folder + '/' + item.id, type, imageName).then(function (res, err) {
                    if (res && res.key) {
                        uploadedImage = res;
                    }
                });
            }

            if (uploadedImage && uploadedImage.key) {
                await ImageService.createOrUpdateImage(
                    model,
                    item.id,
                    uploadedImage.key,
                    null,
                    true
                );
            }
        }
        else {
            await ImageService.createImage(
                'ProjectFile',
                item.id,
                image.image,
                null
            );
        }
    });
};

export const deleteAssociations = async (model, condition) => {
    await model.destroy(condition);
};
