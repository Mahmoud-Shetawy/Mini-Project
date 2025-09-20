import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
    AllowNull,
    Default,
    Validate,
} from "sequelize-typescript";

export interface OrderAttributes {
    id?: number;
    userId: number;
    items: string;
    totalAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table({
    tableName: "orders",
    timestamps: true,
    underscored: true,
})
export class Order extends Model<OrderAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(255),
    })
    items: string;

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2),
        validate: {
            min: 0,
        },
    })
    totalAmount: number;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}
