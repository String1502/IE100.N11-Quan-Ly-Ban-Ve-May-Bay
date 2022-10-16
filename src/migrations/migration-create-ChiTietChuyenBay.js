'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('chitietchuyenbay', {
            MaCTCB: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            MaChuyenBay: {
                type: Sequelize.INTEGER,
            },
            MaSBTG: {
                type: Sequelize.INTEGER,
            },
            ThuTu: {
                type: Sequelize.INTEGER,
            },
            ThoiGianDung: {
                type: Sequelize.INTEGER,
            },
            GhiChu: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('chitietchuyenbay');
    },
};
