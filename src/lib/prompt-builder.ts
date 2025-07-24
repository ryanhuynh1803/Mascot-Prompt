import { PromptOptions } from "@/types/mascot";

export const buildPrompt = (options: Partial<PromptOptions>): string => {
  const get = (key: keyof PromptOptions) => options[key] || "none";
  
  const colorDetails = `
Skin Color: (${get('skinColor')})
Shirt Color: (${get('shirtColor')})
Pants Color: (${get('pantsColor')})
`;

  return `create a mascot character in a (${get('artStyle')}) art style and (${get('format')}) format.

Character Type: (${get('characterType')})
Core Personality Traits: (${get('personalityTraits')})
Field of Use: (${get('fieldOfUse')})

Perceived Material/Texture: (${get('material')})
Head Shape & Size: (${get('headShape')})
Hair Style & Color: (${get('hairStyle')})
Body Proportion & Shape: (${get('bodyProportion')})
Arm Design: (Simple cartoon arms, soft, with realistic hands)
Leg/Foot Design: (${get('legDesign')})
Overall Proportion: (1:2 – head twice as big as body, cute and toy-like)

Default Pose: (${get('defaultPose')})
View Angle: (${get('viewAngle')})
Action or Gesture: (${get('actionGesture')})
Facial Expression: (${get('facialExpression')})
Eyes: (${get('eyes')})
Mouth: (${get('mouth')})

Accessories: (${get('accessories')})
Color Details: ${colorDetails.trim()}
Logo Placement: (Small brand badge on shirt hem)
Design Language/Visual Culture: (Modern Asian + Toy-like aesthetic, inspired by Japanese vinyl mascots)
Potential Application Context: (Tech website, mobile app onboarding, printed branding, event standees)

Use a background with the color (${get('backgroundColor')}). The mascot should appear friendly, modern, and visually engaging for educational branding and digital use.`;
};