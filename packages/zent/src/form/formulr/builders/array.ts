import { BasicBuilder, $GetBuilderValue, $GetBuilderModel } from './basic';
import { FieldArrayModel } from '../models';
import { Maybe, or } from '../maybe';

export class FieldArrayBuilder<
  ChildBuilder extends BasicBuilder<any, any>
> extends BasicBuilder<
  readonly $GetBuilderValue<ChildBuilder>[],
  FieldArrayModel<
    $GetBuilderValue<ChildBuilder>,
    $GetBuilderModel<ChildBuilder>
  >
> {
  private _defaultValue: ReadonlyArray<$GetBuilderValue<ChildBuilder>> = [];

  constructor(private readonly childBuilder: ChildBuilder) {
    super();
  }

  defaultValue(defaultValue: ReadonlyArray<$GetBuilderValue<ChildBuilder>>) {
    this._defaultValue = defaultValue;
    return this;
  }

  build(
    defaultValue?: Maybe<ReadonlyArray<$GetBuilderValue<ChildBuilder>>>
  ): FieldArrayModel<
    $GetBuilderValue<ChildBuilder>,
    $GetBuilderModel<ChildBuilder>
  > {
    const model = new FieldArrayModel<
      $GetBuilderValue<ChildBuilder>,
      $GetBuilderModel<ChildBuilder>
    >(
      this.childBuilder,
      or(defaultValue, () => this._defaultValue)
    );
    model.validators = this._validators;
    return model;
  }
}
