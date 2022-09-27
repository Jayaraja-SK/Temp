#include<glut/glut.h>
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



void Square(float xa, float ya, float xb, float yb, float xt, float yt)
{
    glBegin(GL_QUADS);
    //glColor3f(0.0f,0.0f,0.0f);
    glVertex3f(xa+xt,ya+yt,0.0f);
    glVertex3f(xb+xt,ya+yt,0.0f);
    glVertex3f(xb+xt,yb+yt,0.0f);
    glVertex3f(xa+xt,yb+yt,0.0f);
    glEnd();
    glFlush();
}


void Square_Rot(float xa, float ya, float xb, float yb, float xr, float yr, float theta)
{
    int x1,y1,x2,y2,x3,y3,x4,y4;
    
    x1=xa;
    y1=ya;
    x2=xb;
    y2=ya;
    x3=xb;
    y3=yb;
    x4=xa;
    y4=yb;
    
    x1 = xr + (x1-xr)*cos(theta) - (y1-yr)*sin(theta);
    y1 = yr + (x1-xr)*sin(theta) + (y1-yr)*cos(theta);
    
    x2 = xr + (x2-xr)*cos(theta) - (y2-yr)*sin(theta);
    y2 = yr + (x2-xr)*sin(theta) + (y2-yr)*cos(theta);
    
    x3 = xr + (x3-xr)*cos(theta) - (y3-yr)*sin(theta);
    y3 = yr + (x3-xr)*sin(theta) + (y3-yr)*cos(theta);
    
    x4 = xr + (x4-xr)*cos(theta) - (y4-yr)*sin(theta);
    y4 = yr + (x4-xr)*sin(theta) + (y4-yr)*cos(theta);
    
    glBegin(GL_QUADS);
    glVertex3f(x1,y1,0.0f);
    glVertex3f(x2,y2,0.0f);
    glVertex3f(x3,y3,0.0f);
    glVertex3f(x4,y4,0.0f);
    glEnd();
    glFlush();
}



void Translation()
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
    
    xa=0;
    ya=0;
    xb=3;
    yb=3;
    
    Square(xa, ya, xb, yb, 0,0);

    glFlush();
    
    float xt,yt;

    cout << "xt = ";
    cin >> xt;
    cout << "yt = ";
    cin >> yt;
    
    Square(xa, ya, xb, yb, xt, yt);
}


void Rotation()
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
    
    xa=0;
    ya=0;
    xb=3;
    yb=3;
    
    //Square(xa, ya, xb, yb, 0, 0);

    //glFlush();
    
    float xr,yr,x_new,y_new,theta;

    cout << "xr = ";
    cin >> xr;
    cout << "yr = ";
    cin >> yr;
    cout << "theta = ";
    cin >> theta;
    
    
    Square_Rot(xa, ya, xb, yb, xr, yr, theta*(3.14/180));
    
    //x_new = xr + (x-xr);
}




int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Fifth Exercise");
    glutDisplayFunc(Rotation);
    myInit();
    glutMainLoop();
    return 1;
}
