export type BodyPart = 'head' | 'expression' | 'body' | 'accessories' | 'legs' | 'colors' | 'context' | 'view';

export const bodyPartsOrder: BodyPart[] = ['head', 'expression', 'body', 'accessories', 'legs', 'colors', 'context', 'view'];

export interface PromptOptions {
  artStyle: string;
  format: string;
  characterType: string;
  personalityTraits: string;
  fieldOfUse: string;
  material: string;
  headShape: string;
  hairStyle: string;
  bodyProportion: string;
  defaultPose: string;
  actionGesture: string;
  facialExpression: string;
  eyes: string;
  mouth: string;
  accessories: string;
  viewAngle: string;
  legDesign: string;
  // New color options
  skinColor: string;
  shirtColor: string;
  pantsColor: string;
  backgroundColor: string;
}

export const defaultOptions: PromptOptions = {
  artStyle: "Chibi",
  format: "2D Vector",
  characterType: "Animal",
  personalityTraits: "Friendly",
  fieldOfUse: "Education",
  material: "Fabric",
  headShape: "Large round head, oversized in proportion to body",
  hairStyle: "Spiky black hair with soft shine",
  bodyProportion: "Chibi body, 1:2 head-to-body ratio, small torso, round limbs",
  defaultPose: "Standing upright",
  actionGesture: "Waving one hand and holding a small book in the other",
  facialExpression: "Smiling gently, happy and engaged",
  eyes: "Large round eyes with shiny pupils and highlight reflections",
  mouth: "Small curved smiling mouth, friendly look",
  accessories: "Big round glasses, brown leather crossbody bag",
  viewAngle: "Front view",
  legDesign: "Short legs with white-gray sneakers, rubber sole detail",
  // Defaults for new colors
  skinColor: "#FFDDC5",
  shirtColor: "#4A4A4A",
  pantsColor: "#88DAB3",
  backgroundColor: "#F0F4F8",
};

export const bodyPartOptions = {
  head: ['artStyle', 'format', 'characterType', 'headShape', 'hairStyle'],
  expression: ['facialExpression', 'eyes', 'mouth'],
  body: ['personalityTraits', 'material', 'bodyProportion', 'defaultPose', 'actionGesture'],
  accessories: ['accessories'],
  context: ['fieldOfUse'],
  view: ['viewAngle'],
  legs: ['legDesign'],
  colors: ['skinColor', 'shirtColor', 'pantsColor', 'backgroundColor'],
};