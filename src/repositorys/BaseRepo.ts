import * as Mongoose from "mongoose";
import { ObjectId, TypegooseModel } from "../lib/helper/interfaces";
import { NotFoundError } from "../lib/helper/statused-error";
import { Service } from "typedi";

export class IdNotFoundError extends NotFoundError {
  constructor(id: ObjectId, targetName = "instance") {
    super(`no '${targetName}' was found for id '${id}'`);
  }
}

/**
 * Simple utility class that provides exception-driven mongoose CRUD functionality.
 * @param TDoc Type of target mongoose documents.
 */
@Service()
export class BaseRepo<T extends Mongoose.Model<InstanceType<any>>> {
  /**
   * Instanciates TryCrud utility class that is bound to the given `model`
   * @param model Target `Mongoose.Model` to bind to.
   */
  constructor(protected readonly model: TypegooseModel<T>) {}

  /**
   * Tries to find document by `id` and call `doc.remove()`.
   *
   * @param id Id of the target document to delete.
   *
   * @throws IdNotFoundError | Error
   * If no such document was found or mongoose ODM throws an error.
   */
  async tryDeleteById(id: ObjectId) {
    const doc = await this.model.findById(id).exec();
    if (doc == null) {
      throw new IdNotFoundError(id);
    }
    return doc.remove();
  }

  /**
   * Tries to `findByIdAndUpdate()` the document.
   * Returns the updated document.
   *
   * @param id     Id of the target document to update.
   * @param update Mongoose update object.
   *
   * @throws IdNotFoundError | Error
   * If no such document was found or mongoose ODM throws an error.
   */
  async tryUpdateById(id: ObjectId, update: any) {
    const updatedDoc = await this.model
      .findByIdAndUpdate(id, update, { new: true })
      .lean()
      .exec();
    if (updatedDoc == null) {
      throw new IdNotFoundError(id);
    }
    return updatedDoc;
  }
  /**
   * Tries to `findById(id)` and returns the given result.
   *
   * @param id Target document `ObjectId` to search for.
   *
   * @throws IdNotFoundError | Error
   * If no such document was found or mongoose ODM throws an error.
   */
  async tryFindById(id: ObjectId) {
    const doc = await this.model.findById(id).lean().exec();
    if (doc == null) {
      throw new IdNotFoundError(id);
    }
    return doc;
  }

  /**
   * Tries to `findOne(queryObj)` and returns the given result.
   *
   * @param queryObj Mongoose query object.
   *
   * @throws IdNotFoundError | Error
   * If no such document was found or mongoose ODM throws an error.
   */
  async tryFindOne(queryObj: any) {
    const doc = await this.model.findOne(queryObj).lean().exec();
    if (doc == null) {
      throw new NotFoundError();
    }
    return doc;
  }
}
