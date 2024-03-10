import fs from 'fs';

function findMatchingStrings(arr1, arr2) {
    const matchingPairs = [];
    
    arr1.forEach((str1) => {
        arr2.forEach((str2) => {
            // 使用最长公共子串算法来判断两个字符串是否存在相同片段
            if (longestCommonSubstring(str1, str2) > 3) {
                matchingPairs.push([str1, str2]);
            }
        });
    });
    
    return matchingPairs;
}

function longestCommonSubstring(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
    let maxLen = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                maxLen = Math.max(maxLen, dp[i][j]);
            }
        }
    }

    return maxLen;
}

// 示例字符串数组
const arr1 = [
    "Root",
    "J_Bip_C_Hips",
    "J_Bip_C_Spine",
    "J_Bip_C_Chest",
    "J_Bip_C_UpperChest",
    "J_Sec_L_Bust1",
    "J_Sec_L_Bust2",
    "J_Sec_R_Bust1",
    "J_Sec_R_Bust2",
    "J_Bip_C_Neck",
    "J_Bip_C_Head",
    "J_Adj_L_FaceEye",
    "J_Adj_R_FaceEye",
    "J_Sec_Hair1_01",
    "J_Sec_Hair2_01",
    "J_Sec_Hair3_01",
    "J_Sec_Hair4_01",
    "J_Sec_Hair5_01",
    "J_Sec_Hair5_01_end",
    "J_Sec_Hair1_02",
    "J_Sec_Hair2_02",
    "J_Sec_Hair3_02",
    "J_Sec_Hair3_02_end",
    "J_Sec_Hair1_03",
    "J_Sec_Hair2_03",
    "J_Sec_Hair3_03",
    "J_Sec_Hair3_03_end",
    "J_Sec_Hair1_04",
    "J_Sec_Hair2_04",
    "J_Sec_Hair3_04",
    "J_Sec_Hair3_04_end",
    "J_Sec_Hair1_05",
    "J_Sec_Hair2_05",
    "J_Sec_Hair3_05",
    "J_Sec_Hair3_05_end",
    "J_Sec_Hair1_06",
    "J_Sec_Hair2_06",
    "J_Sec_Hair3_06",
    "J_Sec_Hair3_06_end",
    "J_Sec_Hair1_07",
    "J_Sec_Hair2_07",
    "J_Sec_Hair3_07",
    "J_Sec_Hair3_07_end",
    "J_Sec_Hair1_08",
    "J_Sec_Hair2_08",
    "J_Sec_Hair3_08",
    "J_Sec_Hair3_08_end",
    "J_Sec_Hair1_09",
    "J_Sec_Hair2_09",
    "J_Sec_Hair3_09",
    "J_Sec_Hair3_09_end",
    "J_Sec_Hair1_10",
    "J_Sec_Hair2_10",
    "J_Sec_Hair3_10",
    "J_Sec_Hair3_10_end",
    "J_Sec_Hair1_11",
    "J_Sec_Hair2_11",
    "J_Sec_Hair3_11",
    "J_Sec_Hair3_11_end",
    "J_Bip_L_Shoulder",
    "J_Bip_L_UpperArm",
    "J_Sec_L_TopsUpperArmInside_01",
    "J_Sec_L_TopsUpperArmInside_end_01",
    "J_Sec_L_TopsUpperArmInside_end_01_end",
    "J_Sec_L_TopsUpperArmOutside_01",
    "J_Sec_L_TopsUpperArmOutside_end_01",
    "J_Sec_L_TopsUpperArmOutside_end_01_end",
    "J_Bip_L_LowerArm",
    "J_Bip_L_Hand",
    "J_Bip_L_Index1",
    "J_Bip_L_Index2",
    "J_Bip_L_Index3",
    "J_Bip_L_Little1",
    "J_Bip_L_Little2",
    "J_Bip_L_Little3",
    "J_Bip_L_Middle1",
    "J_Bip_L_Middle2",
    "J_Bip_L_Middle3",
    "J_Bip_L_Ring1",
    "J_Bip_L_Ring2",
    "J_Bip_L_Ring3",
    "J_Bip_L_Thumb1",
    "J_Bip_L_Thumb2",
    "J_Bip_L_Thumb3",
    "J_Bip_R_Shoulder",
    "J_Bip_R_UpperArm",
    "J_Sec_R_TopsUpperArmInside_01",
    "J_Sec_R_TopsUpperArmInside_end_01",
    "J_Sec_R_TopsUpperArmInside_end_01_end",
    "J_Sec_R_TopsUpperArmOutside_01",
    "J_Sec_R_TopsUpperArmOutside_end_01",
    "J_Sec_R_TopsUpperArmOutside_end_01_end",
    "J_Bip_R_LowerArm",
    "J_Bip_R_Hand",
    "J_Bip_R_Index1",
    "J_Bip_R_Index2",
    "J_Bip_R_Index3",
    "J_Bip_R_Little1",
    "J_Bip_R_Little2",
    "J_Bip_R_Little3",
    "J_Bip_R_Middle1",
    "J_Bip_R_Middle2",
    "J_Bip_R_Middle3",
    "J_Bip_R_Ring1",
    "J_Bip_R_Ring2",
    "J_Bip_R_Ring3",
    "J_Bip_R_Thumb1",
    "J_Bip_R_Thumb2",
    "J_Bip_R_Thumb3",
    "J_Bip_L_UpperLeg",
    "J_Sec_L_TopsUpperLegBack_01",
    "J_Sec_R_TopsUpperLegBack_end_01",
    "J_Sec_R_TopsUpperLegBack_end_01_end",
    "J_Sec_L_TopsUpperLegFront_01",
    "J_Sec_L_TopsUpperLegFront_end_01",
    "J_Sec_L_TopsUpperLegFront_end_01_end",
    "J_Sec_L_TopsUpperLegSide_01",
    "J_Sec_L_TopsUpperLegSide_end_01",
    "J_Sec_L_TopsUpperLegSide_end_01_end",
    "J_Bip_L_LowerLeg",
    "J_Bip_L_Foot",
    "J_Bip_L_ToeBase",
    "J_Bip_R_UpperLeg",
    "J_Sec_R_TopsUpperLegBack_01",
    "J_Sec_R_TopsUpperLegBack_end_1_01",
    "J_Sec_R_TopsUpperLegBack_end_1_01_end",
    "J_Sec_R_TopsUpperLegFront_01",
    "J_Sec_R_TopsUpperLegFront_end_01",
    "J_Sec_R_TopsUpperLegFront_end_01_end",
    "J_Sec_R_TopsUpperLegSide_01",
    "J_Sec_R_TopsUpperLegSide_end_01",
    "J_Sec_R_TopsUpperLegSide_end_01_end",
    "J_Bip_R_LowerLeg",
    "J_Bip_R_Foot",
    "J_Bip_R_ToeBase",
    "Face",
    "Face_(merged)(Clone)",
    "Face_(merged)(Clone)_1",
    "Face_(merged)(Clone)_2",
    "Face_(merged)(Clone)_3",
    "Face_(merged)(Clone)_4",
    "Face_(merged)(Clone)_5",
    "Face_(merged)(Clone)_6",
    "Body",
    "Body_(merged)",
    "Body_(merged)_1",
    "Body_(merged)_2",
    "Body_(merged)_3",
    "Body_(merged)_4",
    "Hair",
    "VRMHumanoidRig",
    "Normalized_J_Bip_C_Hips",
    "Normalized_J_Bip_C_Spine",
    "Normalized_J_Bip_C_Chest",
    "Normalized_J_Bip_C_UpperChest",
    "Normalized_J_Bip_C_Neck",
    "Normalized_J_Bip_C_Head",
    "Normalized_J_Adj_L_FaceEye",
    "Normalized_J_Adj_R_FaceEye",
    "Normalized_J_Bip_L_Shoulder",
    "Normalized_J_Bip_L_UpperArm",
    "Normalized_J_Bip_L_LowerArm",
    "Normalized_J_Bip_L_Hand",
    "Normalized_J_Bip_L_Thumb1",
    "Normalized_J_Bip_L_Thumb2",
    "Normalized_J_Bip_L_Thumb3",
    "Normalized_J_Bip_L_Index1",
    "Normalized_J_Bip_L_Index2",
    "Normalized_J_Bip_L_Index3",
    "Normalized_J_Bip_L_Middle1",
    "Normalized_J_Bip_L_Middle2",
    "Normalized_J_Bip_L_Middle3",
    "Normalized_J_Bip_L_Ring1",
    "Normalized_J_Bip_L_Ring2",
    "Normalized_J_Bip_L_Ring3",
    "Normalized_J_Bip_L_Little1",
    "Normalized_J_Bip_L_Little2",
    "Normalized_J_Bip_L_Little3",
    "Normalized_J_Bip_R_Shoulder",
    "Normalized_J_Bip_R_UpperArm",
    "Normalized_J_Bip_R_LowerArm",
    "Normalized_J_Bip_R_Hand",
    "Normalized_J_Bip_R_Thumb1",
    "Normalized_J_Bip_R_Thumb2",
    "Normalized_J_Bip_R_Thumb3",
    "Normalized_J_Bip_R_Index1",
    "Normalized_J_Bip_R_Index2",
    "Normalized_J_Bip_R_Index3",
    "Normalized_J_Bip_R_Middle1",
    "Normalized_J_Bip_R_Middle2",
    "Normalized_J_Bip_R_Middle3",
    "Normalized_J_Bip_R_Ring1",
    "Normalized_J_Bip_R_Ring2",
    "Normalized_J_Bip_R_Ring3",
    "Normalized_J_Bip_R_Little1",
    "Normalized_J_Bip_R_Little2",
    "Normalized_J_Bip_R_Little3",
    "Normalized_J_Bip_L_UpperLeg",
    "Normalized_J_Bip_L_LowerLeg",
    "Normalized_J_Bip_L_Foot",
    "Normalized_J_Bip_L_ToeBase",
    "Normalized_J_Bip_R_UpperLeg",
    "Normalized_J_Bip_R_LowerLeg",
    "Normalized_J_Bip_R_Foot",
    "Normalized_J_Bip_R_ToeBase",
    "VRMExpression_happy",
    "VRMExpression_angry",
    "VRMExpression_sad",
    "VRMExpression_relaxed",
    "VRMExpression_surprised",
    "VRMExpression_aa",
    "VRMExpression_ih",
    "VRMExpression_ou",
    "VRMExpression_ee",
    "VRMExpression_oh",
    "VRMExpression_blink",
    "VRMExpression_blinkLeft",
    "VRMExpression_blinkRight",
    "VRMExpression_neutral"
];
let arr2 = ["mixamorigHips.position","mixamorigHips.quaternion","mixamorigSpine.quaternion","mixamorigSpine1.quaternion","mixamorigSpine2.quaternion","mixamorigNeck.quaternion","mixamorigHead.quaternion","mixamorigRightShoulder.quaternion","mixamorigRightArm.quaternion","mixamorigRightForeArm.quaternion","mixamorigRightHand.quaternion","mixamorigRightHandThumb1.quaternion","mixamorigRightHandThumb2.quaternion","mixamorigRightHandThumb3.quaternion","mixamorigRightHandIndex1.quaternion","mixamorigRightHandIndex2.quaternion","mixamorigRightHandIndex3.quaternion","mixamorigRightHandMiddle1.quaternion","mixamorigRightHandMiddle2.quaternion","mixamorigRightHandMiddle3.quaternion","mixamorigRightHandRing1.quaternion","mixamorigRightHandRing2.quaternion","mixamorigRightHandRing3.quaternion","mixamorigRightHandPinky1.quaternion","mixamorigRightHandPinky2.quaternion","mixamorigRightHandPinky3.quaternion","mixamorigLeftShoulder.quaternion","mixamorigLeftArm.quaternion","mixamorigLeftForeArm.quaternion","mixamorigLeftHand.quaternion","mixamorigLeftHandThumb1.quaternion","mixamorigLeftHandThumb2.quaternion","mixamorigLeftHandThumb3.quaternion","mixamorigLeftHandIndex1.quaternion","mixamorigLeftHandIndex2.quaternion","mixamorigLeftHandIndex3.quaternion","mixamorigLeftHandMiddle1.quaternion","mixamorigLeftHandMiddle2.quaternion","mixamorigLeftHandMiddle3.quaternion","mixamorigLeftHandRing1.quaternion","mixamorigLeftHandRing2.quaternion","mixamorigLeftHandRing3.quaternion","mixamorigLeftHandPinky1.quaternion","mixamorigLeftHandPinky2.quaternion","mixamorigLeftHandPinky3.quaternion","mixamorigRightUpLeg.quaternion","mixamorigRightLeg.quaternion","mixamorigRightFoot.quaternion","mixamorigRightToeBase.quaternion","mixamorigLeftUpLeg.quaternion","mixamorigLeftLeg.quaternion","mixamorigLeftFoot.quaternion","mixamorigLeftToeBase.quaternion"];

arr2 = arr2.map((str) => str.split('.')[0]);
arr2 = [...new Set(arr2)];

const matchingPairs = findMatchingStrings(arr1, arr2);
console.log(matchingPairs);

fs.writeFileSync('out.json', JSON.stringify(matchingPairs));