#include <GL/glut.h>
#include <iostream>
#include <cmath>
#include <cstring>

using namespace std;


void myInit() {
    glClearColor(1.0,1.0,1.0,0.0);
    glColor3f(0.0f,0.0f,0.0f);
    glPointSize(10);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(-10.0,10.0,-10.0,10.0);
}


void plotPointString(int x, int y, int pos)
{
    glRasterPos2f(x,y+pos);

    std::string string;
    
    string="("+std::to_string(int(round(x)))+","+std::to_string(int(round(y)))+")";

    char *s=const_cast<char*>(string.c_str());

    for (char* c = s; *c != '\0'; c++)
            glutBitmapCharacter(GLUT_BITMAP_HELVETICA_10 , *c);
}



void plotPoint(int x, int y)
{
    glBegin(GL_POINTS);
    glVertex2f(x,y);
    glEnd();
}


void Square(float xa, float ya, float xb, float yb)
{
    glBegin(GL_QUADS);
    //glColor3f(0.0f,0.0f,0.0f);
    glVertex3f(xa,ya,0.0f);
    glVertex3f(xb,ya,0.0f);
    glVertex3f(xb,yb,0.0f);
    glVertex3f(xa,yb,0.0f);
    glEnd();
    glFlush();
}


float getCoord(float matrix[3], float coord[3])
{
    int i;
    
    float temp = 0;
    
    for(i=0;i<3;i++)
    {
        temp = temp + (matrix[i]*coord[i]);
    }
    
    return temp;
}



void CompSquare(float xa, float ya, float xb, float yb, float n, float comp[100][3][3])
{
    glBegin(GL_QUADS);
    
    int i,j,k,l;
    
    float resComp[3][3];
    
    for(i=0;i<3;i++)
    {
        for(j=0;j<3;j++)
        {
            resComp[i][j] = comp[0][i][j];
        }
    }
    
    
    for(i=1;i<n;i++)
    {
        float tempMat[3][3] = {{0,0,0}, {0,0,0}, {0,0,0}};
        
        for(j=0;j<3;j++)
        {
            for(k=0;k<3;k++)
            {
                float temp = 0;
                
                for(l=0;l<3;l++)
                {
                    temp = temp + (resComp[j][l]*comp[i][l][k]);
                }
                
                tempMat[j][k] = temp;
            }
        }
        
        for(j=0;j<3;j++)
        {
            for(k=0;k<3;k++)
            {
                resComp[j][k] = tempMat[j][k];
            }
        }
    }
    
    
    
    float coord1[3] = {xa, ya, 1};
    float coord2[3] = {xb, ya, 1};
    float coord3[3] = {xb, yb, 1};
    float coord4[3] = {xa, yb, 1};
    
    glVertex3f(getCoord(resComp[0], coord1),getCoord(resComp[1], coord1),0.0f);
    glVertex3f(getCoord(resComp[0], coord2),getCoord(resComp[1], coord2),0.0f);
    glVertex3f(getCoord(resComp[0], coord3),getCoord(resComp[1], coord3),0.0f);
    glVertex3f(getCoord(resComp[0], coord4),getCoord(resComp[1], coord4),0.0f);

    
    glEnd();
    glFlush();
}



void Composite()
{
    glClear(GL_COLOR_BUFFER_BIT);
    
    glRasterPos2f(0.0f,0.0f);

    plotPointString(0,0,0);

    glLineWidth(2);
    glPointSize(7);
    glBegin(GL_LINES);
    
    glVertex3f(-320.0f,0.0f,0.0f);
    glVertex3f(320.0f,0.0f,0.0f);

    glEnd();

    

    glLineWidth(2);

    glBegin(GL_LINES);

    glVertex3f(0.0f,-240.0f,0.0f);
    glVertex3f(0.0f,240.0f,0.0f);

    glEnd();
    
    float xa, ya, xb, yb;
    
    cout << "xa = ";
    cin >> xa;
    cout << "ya = ";
    cin >> ya;
    cout << "\n";
    
    cout << "xb = ";
    cin >> xb;
    cout << "yb = ";
    cin >> yb;
    
    cout << "\n";
    
    glColor3f(1.0f,0.0f,0.0f);
    Square(xa, ya, xb, yb);

    glFlush();


    int n=0;

    float comp[20][3][3];
    
    int i,j;

    while(1)
    {
        cout << "\n";
        cout << "1. TRANSLATION\n";
        cout << "2. ROTATION\n";
        cout << "3. SCALING\n";
        cout << "4. REFLECTION ABOUT X-AXIS\n";
        cout << "5. REFLECTION ABOUT Y-AXIS\n";
        cout << "6. REFLECTION ABOUT ORIGIN\n";
        cout << "7. REFLECTION ABOUT X=Y LINE\n";
        cout << "8. X-SHEAR\n";
        cout << "9. Y-SHEAR\n";
        cout << "10. EXIT\n\n";

        int choice;

        cout << "ENTER CHOICE = ";
        cin >> choice;

        int i,j;

        if(choice == 1)
        {
            float xt,yt;
        
            cout << "xt = ";
            cin >> xt;
            cout << "yt = ";
            cin >> yt;
            
            cout << "\n";

            float translation[3][3] = {{1,0,xt}, {0,1,yt}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = translation[i][j];
                }
            }

            n=n+1;
        }
        else if(choice == 2)
        {
            float theta,xr,yr;
        
            cout << "theta = ";
            cin >> theta;
            cout << "xr = ";
            cin >> xr;
            cout << "yr = ";
            cin >> yr;
            
            cout << "\n";

            theta = theta*(3.14/180);

            float rotation[3][3] = {{cos(theta),-sin(theta),xr*(1-cos(theta))+yr*sin(theta)}, {sin(theta),cos(theta),yr*(1-cos(theta))-xr*sin(theta)}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = rotation[i][j];
                }
            }

            n=n+1;
        }
        else if(choice == 3)
        {
            float sx,sy;
        
            cout << "sx = ";
            cin >> sx;
            cout << "sy = ";
            cin >> sy;
            
            cout << "\n";

            float scale[3][3] = {{sx,0,0}, {0,sy,0}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = scale[i][j];
                }
            }

            n=n+1;
        }
        else if(choice == 4)
        {
            float reflectionX[3][3] = {{1,0,0}, {0,-1,0}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = reflectionX[i][j];
                }
            }

            n=n+1;
        }
        else if(choice == 5)
        {
            float reflectionY[3][3] = {{-1,0,0}, {0,1,0}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = reflectionY[i][j];
                }
            }

            n=n+1;
        }
        else if(choice == 6)
        {
            float reflectionOrigin[3][3] = {{-1,0,0}, {0,-1,0}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = reflectionOrigin[i][j];
                }
            }

            n=n+1;
        }
        else if(choice == 7)
        {
            float reflectionYX[3][3] = {{0,1,0}, {1,0,0}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = reflectionYX[i][j];
                }
            }

            n=n+1;
        }
        else if(choice == 8)
        {
            float shx, yref;

            cout << "shx = ";
            cin >> shx;
            cout << "yref = ";
            cin >> yref;

            float shearX[3][3] = {{1,shx,-shx*yref}, {0,1,0}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = shearX[i][j];
                }
            }

            n=n+1;
        }
        else if(choice == 9)
        {
            float shy, xref;

            cout << "shy = ";
            cin >> shy;
            cout << "xref = ";
            cin >> xref;

            float shearY[3][3] = {{1,0,0}, {shy, 1, -shy*xref}, {0,0,1}};

            for(i=0;i<3;i++)
            {
                for(j=0;j<3;j++)
                {
                    comp[n][i][j] = shearY[i][j];
                }
            }

            n=n+1;
        }
        else
        {
            break;
        }
    }
    
    
    glColor3f(0.0f,1.0f,0.0f);
    CompSquare(xa, ya, xb, yb, n, comp);
}




int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Sixth Exercise");
    glutDisplayFunc(Composite);
    myInit();
    glutMainLoop();
    return 1;
}
