import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import open3d as o3d

def generate_coal_pile_point_cloud(length=20, width=10, height=5, density=0.05):
    """
    生成长堆状煤堆的点云数据
    
    参数:
        length: 煤堆长度 (默认20米)
        width: 煤堆宽度 (默认10米)
        height: 煤堆最大高度 (默认5米)
        density: 点密度 (点/立方米, 默认0.05)
    
    返回:
        numpy数组 (N,3) 表示点云坐标
    """
    # 计算总点数
    volume = length * width * height * 0.5  # 近似锥体体积
    num_points = int(volume * density)
    
    # 生成基础网格
    x = np.random.uniform(-length/2, length/2, num_points)
    z = np.random.uniform(-width/2, width/2, num_points)
    
    # 计算高度 (抛物线形状)
    dist_from_center = np.sqrt((x / (length/2))**2 + (z / (width/2))**2)
    y = height * (1 - dist_from_center**2)
    y[y < 0] = 0  # 确保高度不小于0
    
    # 添加噪声使表面更真实
    y += np.random.normal(0, height*0.05, num_points)
    y[y < 0] = 0
    
    # 组合成点云
    points = np.column_stack((x, y, z))
    
    return points

def save_point_cloud_to_ply(points, filename):
    """
    将点云保存为PLY文件
    
    参数:
        points: 点云数据 (N,3)
        filename: 输出文件名
    """
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(points)
    o3d.io.write_point_cloud(filename, pcd)
    print(f"点云已保存到 {filename}")

def visualize_point_cloud(points):
    """
    可视化点云
    """
    fig = plt.figure(figsize=(10, 8))
    ax = fig.add_subplot(111, projection='3d')
    
    # 绘制点云
    ax.scatter(points[:, 0], points[:, 1], points[:, 2], 
               c=points[:, 1], cmap='viridis', s=1, alpha=0.6)
    
    # 设置坐标轴标签
    ax.set_xlabel('X (长度方向)')
    ax.set_ylabel('Y (高度)')
    ax.set_zlabel('Z (宽度方向)')
    ax.set_title('长堆状煤堆点云数据')
    
    plt.tight_layout()
    plt.show()

# 生成点云数据
coal_pile_points = generate_coal_pile_point_cloud(
    length=90,  # 煤堆长度30米
    width=50,   # 煤堆宽度15米
    height=20,   # 煤堆最大高度8米
    density=8 # 点密度
)

# 可视化点云
# visualize_point_cloud(coal_pile_points)

# 保存为PLY文件
save_point_cloud_to_ply(coal_pile_points, "coal_pile_point_cloud.ply")