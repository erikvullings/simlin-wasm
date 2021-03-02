import m from 'mithril';
import { Dashboards, MeiosisComponent } from '../services';
import model from '../assets/test.pb';
import type {
  Engine as IEngine,
  // Error as EngineError,
  // EquationError as EngineEquationError,
} from '@system-dynamics/engine';
import {
  open,
  // errorCodeDescription
} from '@system-dynamics/engine';
// import {
//   Project,
//   Model,
//   Variable,
//   UID,
//   Stock as StockVar,
//   ViewElement,
//   NamedViewElement,
//   StockFlowView,
//   GraphicalFunction,
//   LinkViewElement,
//   AuxViewElement,
//   FlowViewElement,
//   StockViewElement,
//   CloudViewElement,
//   viewElementType,
//   EquationError,
//   SimError,
//   ModelError,
//   ErrorCode,
//   Rect,
// } from '@system-dynamics/core/datamodel';
import {
  // defined,
  // exists,
  Series,
  // toInt,
  // uint8ArraysEqual
} from '@system-dynamics/core/lib.module/common';

export const HomePage: MeiosisComponent = () => {
  let engine: IEngine | undefined;

  return {
    oninit: async ({
      attrs: {
        actions: { setPage },
      },
    }) => {
      setPage(Dashboards.HOME);
      engine = await open(model);
      if (!engine) {
        console.error(`opening the project in the engine failed`);
        return;
      }
    },
    view: ({ attrs: { state } }) => {
      console.log(state);
      if (!engine) {
        return m('.home-page', 'Engine is not defined');
      }
      if (!engine.isSimulatable()) {
        return m('.home-page', 'Engine is not simulatable');
      }
      try {
        if (!engine) {
          return m('.home-page', 'Engine is not defined');
        }
        engine.simRunToEnd();
        const idents = engine.simVarNames() as string[];
        const time = engine.simSeries('time');
        const data = new Map<string, Series>(
          idents.map((ident) => [ident, { name: ident, time, values: engine!.simSeries(ident) }])
        );
        console.log(data);
        setTimeout(() => {
          engine && engine.simClose();
        });
        // const project = defined(this.project());
        // this.setState({
        //   activeProject: project.attachData(data, this.state.modelName),
        //   data,
        // });
      } catch (e) {
        console.error(e);
        // this.setState({
        //   modelErrors: this.state.modelErrors.push(e),
        // });
      }
      return m('.home-page', [m('div', 'HOMEPAGE')]);
    },
  };
};
